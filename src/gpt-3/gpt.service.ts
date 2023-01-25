import { Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';

@Injectable()
export class GptService {
  constructor(private readonly api: OpenAIApi) {}

  async generateResponse(input: string): Promise<string> {
    const response = await this.api.createCompletion({
      max_tokens: 256,
      temperature: 0.7,
      n: 1,
      top_p: 1,
      model: 'text-babbage-001',
      prompt:
        "you: Hi, my name is Carl and I'm a digital marketing sales representative. How can I help you today?\ncustomer: Hi Carl, I'm interested in increasing my online presence and getting more leads for my business.\nyou: That's great to hear! We offer a wide range of digital marketing services, including SEO, PPC, social media marketing, and email marketing. Which services are you most interested in?\ncustomer: I'm most interested in SEO and PPC. Can you tell me more about those services?\nyou: Sure, SEO stands for search engine optimization and it involves optimizing your website and content to rank higher in search engine results. This can help increase the visibility and credibility of your business. PPC, or pay-per-click advertising, involves placing ads on search engines and social media platforms. These ads are only charged when someone clicks on them, giving you more control over your advertising budget.\ncustomer: That sounds like exactly what I need. Can you give me an idea of the costs involved?\nyou: Our SEO and PPC services are tailored to the specific needs of each client, so the cost will vary depending on your goals and the level of competition in your industry. However, we can provide you with a custom quote after learning more about your business and what you're looking to achieve.\ncustomer:" +
        input,
    });

    console.log(response.data);

    return response.data.choices[0].text;
  }
}
