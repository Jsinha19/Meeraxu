import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

const SYSTEM_PROMPT = `You are the Meeraxu Intelligence website assistant.
Be helpful, concise, and professional. Answer questions about Meeraxu Intelligence,
its AI, software, web development, design, and digital services, its projects,
and how visitors can use this website. Use only information available in the
conversation or clearly stated on the website. Verified contact details are:
hello@meeraxu.ai for general inquiries, admin@meeraxuintelligence.com for direct
email, +91 75681 85591 by phone, and San Francisco, CA as the base location.
Share these details when asked; do not replace them with a generic instruction to
visit the Contact page. Do not invent pricing, guarantees, team members, contact
details, or company facts. When referring users to a website page, use one of
these exact markdown links: [Home](/), [About](/about), [Contact](/contact),
[Privacy Policy](/privacy-policy), or [Terms and Conditions](/terms-and-conditions).`;

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