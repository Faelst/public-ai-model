const Translate = class {
  static translateInstance = null;

  static async getInstance() {
    console.log("Getting translation instance...");

    if (!Translate.translateInstance) {
      const { pipeline } = await import("@huggingface/transformers");
      this.translateInstance = pipeline(
        "translation",
        "Xenova/nllb-200-distilled-600M",
        {
          dtype: "q8",
        },
      );
    }

    return Translate.translateInstance;
  }

  static translateText(text) {
    return this.getInstance().then((instance) =>
      instance(text, {
        src_lang: "eng_Latn",
        tgt_lang: "por_Latn",
      }),
    );
  }
};

module.exports = { Translate };
