function normalizeId(raw) {
  if (raw == null) return null;
  const t = typeof raw;

  if (t === 'string' || t === 'number' || t === 'bigint') return String(raw);

  if (t === 'object') {
    if ('$oid' in raw) return String(raw.$oid);
    if ('value' in raw) return String(raw.value);
    if ('id' in raw) return String(raw.id);
  }
  return null; 
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default class ProdutoEntity {
  constructor(
    id,
    nome,
    preco,
    descricao,
    imagem,
    categoria
  ) {
    const idNorm = normalizeId(id);
    this.id = idNorm ?? newId();

    this.nome = nome ?? '';
    this.preco = preco ?? '';
    this.descricao = descricao ?? '';
    this.imagem = imagem ?? '';
    this.categoria = categoria ?? '';
  }

  get key() {
    return String(this.id);
  }

  static transforme(d) {
    return new ProdutoEntity(
      d?.id ?? d?._id ?? d?.id?.$oid ?? d?.id?.value,
      d?.nome ?? d?.name,
      d?.preco ?? d?.price,
      d?.descricao ?? d?.description,
      d?.imagem ?? d?.image,
      d?.categoria ?? d?.category
    );
  }
}
