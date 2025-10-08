const extractMessages = async (response: any) => {
  try {
    if (!response || !Array.isArray(response)) return [];

    const messagesToSend: string[] = [];

    const extractText = (node: any): string => {
      if (!node) return "";

      if (node.text) return node.text;

      if (node.type === "inline-variable") {
        return node?.children?.[0]?.children?.[0]?.text || "";
      }

      if (Array.isArray(node.children)) {
        return node.children.map(extractText).join("");
      }

      return "";
    };

    for (const item of response) {
      let message = "";

      // if (item.type !== "text") {
      //   const input = await INPUTSCONTROLLER.treatmentMessage(item);
      //   messagesToSend.push(input);
      //   continue;
      // }

      for (const richText of item.content.richText) {
        if (richText.children.length > 1) {
          // Muitos children → percorre todos
          for (const child of richText.children) {
            message += extractText(child);
          }
          message += "";
        } else {
          if (extractText(richText.children[0]) === "") {
            message += "\n\n";
          } else {
            message += extractText(richText.children[0]);
          }
        }
      }

      messagesToSend.push(message);
    }

    return messagesToSend;
  } catch (e) {
    console.error("Erro ao pegar mensagem do fluxo", e);
    return [];
  }
};

export default extractMessages;
