const express = require('express');
const { translate } = require('@vitalets/google-translate-api');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/traducir', async (req, res) => {
    const { idiomaOrigen, idiomaDestino, frases } = req.body;

    try {
        const traducciones = await Promise.all(frases.map(async (frase) => {
            const { text: traduccion } = await translate(frase, {
                from: idiomaOrigen,
                to: idiomaDestino
            });
            return { frase, traduccion };
        }));

        res.json(traducciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
