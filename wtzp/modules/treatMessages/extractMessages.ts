const extractMessages = (msgs: any[]): string => {
  const mensagens: string[] = [];

  const extractChildren = (node: any) => {
    if (!node) return;

    if (typeof node.text === "string") {

      if (node.text === "") {
        mensagens.push("\n");
      } else {
        mensagens.push(node.text);
      }
    }

    if (node.content?.richText && Array.isArray(node.content.richText)) {
      node.content.richText.forEach(extractChildren);
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(extractChildren);
    }
  };

  if (Array.isArray(msgs)) {
    msgs.forEach((msg) => extractChildren(msg));
  }
  return mensagens.join(" ");
};

export default extractMessages;
