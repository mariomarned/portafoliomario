export default async function handler(req, res) {
  // CORS para permitir peticiones desde el mismo dominio y subdominios
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { nombre, email, telefono, tipo_proyecto, mensaje } = body || {};

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ success: false, message: 'Todos los campos requeridos deben ser completados' });
    }

    // Envío seguro Server-to-Server hacia el buzón de Mario Martínez
    const recipientEmail = 'mmartinez@ned.mobi';
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        email,
        telefono: telefono || 'No proporcionado',
        tipo_proyecto: tipo_proyecto || 'General',
        mensaje,
        _subject: `Nuevo contacto desde Portafolio NED System: ${nombre} (${tipo_proyecto || 'General'})`,
        _template: 'table'
      })
    });

    const data = await response.json().catch(() => ({}));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error procesando formulario de contacto:', error);
    return res.status(500).json({ success: false, message: 'Error interno al procesar el mensaje' });
  }
}
