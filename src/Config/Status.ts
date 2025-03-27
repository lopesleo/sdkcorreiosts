export class Status {
  public static readonly STATUS_DELIVERED = "DELIVERED";
  public static readonly STATUS_MOVEMENT = "MOVEMENT";
  public static readonly STATUS_NOTFOUND = "NOTFOUND";
  public static readonly STATUS_NOBODYHOME = "NOBODY_HOME";
  public static readonly STATUS_DELIVERY_FAILURE = "DELIVERY_FAILURE";
  public static readonly STATUS_REFUSED_RECEIVE = "DELIVERY_FAILURE";
  public static readonly STATUS_UNKNOWN_CUSTOMER = "UNKNOWN_CUSTOMER";
  public static readonly STATUS_CUSTOMER_MOVED = "CUSTOMER_MOVED";
  public static readonly STATUS_NO_IDENTIFICATION = "NO_IDENTIFICATION";
  public static readonly STATUS_NEW_TRY = "NEW_TRY";
  public static readonly STATUS_RETURN_SENDER = "RETURN_SENDER";
  public static readonly STATUS_WAITING_WITHDRAWAL = "WAITING_WITHDRAWAL";
  public static readonly STATUS_LATE = "LATE";
  public static readonly STATUS_RETURN = "RETURN";
  public static readonly STATUS_MAILBOX = "MAILBOX";
  public static readonly STATUS_LOST = "LOST";
  public static readonly STATUS_POSTED = "POSTED";
  public static readonly STATUS_DISTRIBUTION = "DISTRIBUTION";
  public static readonly STATUS_RECEIVED_BRAZIL = "RECEIVED_BRAZIL";
  public static readonly STATUS_STOLEN = "STOLEN";
  public static readonly STATUS_OUT_DELIVERY = "OUT_DELIVERY";

  public static getStatus(statusString: string): string {
    if (!statusString.trim()) {
      return Status.STATUS_NOTFOUND;
    }

    const statusMap: Record<string, string> = {
      "Objeto entregue ao destinatário": Status.STATUS_DELIVERED,
      "Entrega Efetuada": Status.STATUS_DELIVERED,
      "A entrega não pode ser efetuada - Carteiro não atendido":
        Status.STATUS_NOBODYHOME,
      "A entrega não pode ser efetuada": Status.STATUS_DELIVERY_FAILURE,
      "A entrega não pode ser efetuada - Cliente recusou-se a receber":
        Status.STATUS_REFUSED_RECEIVE,
      "A entrega não pode ser efetuada - Cliente desconhecido no local":
        Status.STATUS_UNKNOWN_CUSTOMER,
      "A entrega não pode ser efetuada - Cliente mudou-se":
        Status.STATUS_CUSTOMER_MOVED,
      "A entrega não pode ser efetuada - Destinatário não apresentou documento exigido":
        Status.STATUS_NO_IDENTIFICATION,
      "Coleta ou entrega de objeto não efetuada": Status.STATUS_NEW_TRY,
      "Destinatário não retirou objeto na Unidade dos Correios":
        Status.STATUS_RETURN_SENDER,
      "Objeto aguardando retirada no endereço indicado":
        Status.STATUS_WAITING_WITHDRAWAL,
      "Objeto com atraso na entrega": Status.STATUS_LATE,
      "Objeto devolvido ao remetente": Status.STATUS_RETURN,
      "Objeto disponível para retirada em Caixa Postal": Status.STATUS_MAILBOX,
      "Objeto não localizado": Status.STATUS_NOTFOUND,
      "Objeto Extraviado": Status.STATUS_LOST,
      "Objeto postado": Status.STATUS_POSTED,
      "Objeto postado após o horário limite da agência": Status.STATUS_POSTED,
      "Objeto postado após o horário limite da unidade": Status.STATUS_POSTED,
      "Objeto recebido na unidade de distribuição": Status.STATUS_DISTRIBUTION,
      "Objeto recebido no Brasil": Status.STATUS_RECEIVED_BRAZIL,
      "Objeto roubado": Status.STATUS_STOLEN,
      "Objeto encaminhado": Status.STATUS_MOVEMENT,
      "Objeto saiu para entrega ao remetente": Status.STATUS_OUT_DELIVERY,
      "Objeto saiu para entrega ao destinatário": Status.STATUS_OUT_DELIVERY,
      "Tentativa de entrega não efetuada": Status.STATUS_NEW_TRY,
      "Objeto em transferência - por favor aguarde": Status.STATUS_MOVEMENT,
      "Em trânsito para Unidade de Distribuição": Status.STATUS_MOVEMENT,
    };

    return statusMap[statusString.trim()] || statusString;
  }
}
