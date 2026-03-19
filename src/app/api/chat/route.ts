import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Fallback to OpenRouter API with the provided key
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'HTTP-Referer': 'https://snewroof.com',
        'X-Title': 'S New Roof Chatbot'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful roofing assistant for S NEW ROOF, a professional roofing company serving Orange County and Los Angeles County. You help homeowners with questions about roofing services including installation, repair, emergency services, gutters, skylights, ventilation, and roof coatings. Be friendly, professional, and helpful. Key information:
            
- Company: S NEW ROOF Inc.
- Phone: 714-770-4756
- Email: info@snewroof.com
- Address: 1415 E 17th St Suite 220A, Santa Ana, CA 92705
- Hours: Mon-Sat: 7AM - 7PM
- License: Lic# 1122623
- Services: Roof Installation, Roof Repair, Emergency Services (24/7), Commercial Roofing, Flat Roofing, Gutters, Skylights, Attic Ventilation, Roof Coating, Roof Inspection
- Service Areas: Orange County & Los Angeles County
- Offer: Free roof inspection and estimates
- Booking: https://api.leadconnectorhq.com/widget/bookings/free-roof-inspection-snewroof/

Always encourage customers to book a free inspection for accurate quotes. Be helpful and guide them to contact the company for specific pricing.`
          },
          ...history.map((msg: {role: string, content: string}) => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
          })),
          { role: 'user', content: message }
        ]
      })
    })

    if (!openRouterResponse.ok) {
      throw new Error('Failed to get response from AI')
    }

    const data = await openRouterResponse.json()
    const aiResponse = data.choices?.[0]?.message?.content || 'I apologize, I am having trouble responding right now. Please call us at 714-770-4756 for immediate assistance.'
    
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ 
      response: 'I apologize, I am having trouble responding right now. Please call us at 714-770-4756 or WhatsApp us for immediate assistance with your roofing needs!' 
    }, { status: 200 })
  }
}
