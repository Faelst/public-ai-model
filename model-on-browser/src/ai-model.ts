/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipeline } from "@huggingface/transformers";
import axios from "axios";

// transform class to singleton
export class ImageCaptioner {
  private static captionPipeline: any = null;

  static async getCaptionPipeline(): Promise<any> {
    console.log("Getting caption pipeline...");

    if (!this.captionPipeline) {
      console.log("Initializing caption pipeline...");

      this.captionPipeline = await pipeline(
        "image-to-text",
        "Xenova/vit-gpt2-image-captioning",
        {
          dtype: "q8",
        },
      ).catch((error) => {
        console.error("Error initializing caption pipeline:", error);
      });
    }

    console.log("Caption pipeline ready.");
    return this.captionPipeline;
  }

  public async generateCaption(imageUrl: string): Promise<string> {
    if (!imageUrl) {
      return "Please provide a valid image URL";
    }

    const caption = await (
      await ImageCaptioner.getCaptionPipeline()
    )(imageUrl, {
      max_length: 50,
      do_sample: true,
    });

    return caption[0]["generated_text"];
  }

  public async translateText(text: string): Promise<string> {
    if (!text) {
      return "Please provide valid text";
    }

    try {
      const response = await axios.post("http://localhost:3000/translate", {
        text,
      });
      return response.data;
    } catch (error) {
      console.error("Error translating text:", error);
      return "Error translating text";
    }
  }
}
