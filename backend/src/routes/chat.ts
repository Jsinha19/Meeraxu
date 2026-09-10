import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

const SYSTEM_PROMPT = `You are the Meeraxu Intelligence website assistant.
Answer only what the visitor asks, in 1 to 3 short sentences. Be clear,
professional, and relevant. Talk only about Meeraxu Intelligence and information
stated here: Meeraxu provides AI solutions, software development, web development,
UI/UX design, and digital automation services. Verified contact details are:
hello@meeraxu.ai for general inquiries, admin@meeraxuintelligence.com for direct
email, +91 75681 85591 by phone, and San Francisco, CA as the base location.
If the visitor asks for an email, give only hello@meeraxu.ai unless they explicitly
ask for the admin email. If they ask for a phone number, give only the phone number.
Never add extra contact details, unsolicited advice, pricing, guarantees, team
members, or company facts. Never tell the visitor to visit a page unless they ask
where to find something. If they ask about a page, use exactly one relevant
markdown link from this list: [Home](/), [About](/about), [Contact](/contact),
[Privacy Policy](/privacy-policy), or [Terms and Conditions](/terms-and-conditions).
If you do not know an answer, say that Meeraxu has not provided that information.`;

router.post('/', async (req: Request, res: Response) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!message) {
    return res.status(400).json({ message: 'A message is required' });
  }

  if (message.length > 4000) {
    return res.status(400).json({ message: 'Message must be 4000 characters or less' });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured');
    return res.status(503).json({ message: 'Chat service is not configured' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 180,
      },
    });
    const result = await model.generateContent(message);
    const reply = result.response.text().trim();

    if (!reply) {
      return res.status(502).json({ message: 'The AI returned an empty response' });
    }

    return res.json({ reply });
  } catch (error) {
    console.error('Gemini chat request failed:', error);
    return res.status(502).json({ message: 'Unable to reach the chat service right now' });
  }
});

export default router;