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

export default class UsuarioEntity {
  constructor(id, nome, email, senha) {
    const idNorm = normalizeId(id);
    this.id = idNorm ?? newId();

    this.nome = nome ?? '';
    this.email = email ?? '';
    this.senha = senha ?? '';
  }

  get key() {
    return String(this.id);
  }

  static transforme(d) {
    return new UsuarioEntity(
      d?.id ?? d?._id ?? d?.id?.$oid ?? d?.id?.value,
      d?.nome ?? d?.name,
      d?.email,
      d?.senha ?? d?.password
    );
  }
}
