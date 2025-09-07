function formatFirstMessage(msg: any) {
  let formattedPhone: string;

  const tretedMessage = msg.body.split(" ")[0].trim();

  return tretedMessage;
}

export default formatFirstMessage;
