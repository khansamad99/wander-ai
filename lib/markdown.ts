// Simple markdown parser for basic formatting
export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Handle headers with emojis and better styling
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200 flex items-center">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-gray-300 flex items-center">$1</h2>');  
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-10 mb-6 pb-3 border-b-2 border-blue-200 flex items-center">$1</h1>');
  
  // Handle bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  
  // Handle italic text
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Handle code blocks (triple backticks)
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm">$1</code></pre>');
  
  // Handle inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');
  
  // Handle unordered lists with better formatting
  html = html.replace(/^\* (.*$)/gm, '<li class="mb-3 flex items-start"><span class="mr-3 mt-1 text-blue-600 font-bold">•</span><div class="flex-1">$1</div></li>');
  html = html.replace(/^- (.*$)/gm, '<li class="mb-3 flex items-start"><span class="mr-3 mt-1 text-blue-600 font-bold">•</span><div class="flex-1">$1</div></li>');
  
  // Wrap consecutive list items in ul tags with better spacing
  html = html.replace(/(<li[^>]*>.*<\/li>\s*)+/g, (match) => {
    return `<ul class="my-6 space-y-2 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200">${match}</ul>`;
  });
  
  // Handle line breaks
  html = html.replace(/\n\n/g, '</p><p class="mb-4">');
  html = html.replace(/\n/g, '<br />');
  
  // Wrap in paragraphs
  html = `<div class="prose max-w-none"><p class="mb-4">${html}</p></div>`;
  
  // Clean up empty paragraphs
  html = html.replace(/<p[^>]*><\/p>/g, '');
  html = html.replace(/<p[^>]*>\s*<\/p>/g, '');
  
  return html;
}

// Specialized parser for AI recommendations (handles emojis and sections better)
export function parseAIRecommendation(text: string): string {
  if (!text) return '';
  
  let html = text;
  
  // Handle main recommendation header
  html = html.replace(/^🏆 \*\*(.*?)\*\*/gm, '<div class="flex items-center mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400"><span class="text-2xl mr-3">🏆</span><h3 class="text-xl font-bold text-gray-900">$1</h3></div>');
  
  // Handle recommendation sections with better structure
  html = html.replace(/\*\*Reasoning for Recommendation:\*\*/g, '<h4 class="text-lg font-semibold text-gray-800 mb-4 mt-4">💡 Reasoning for Recommendation:</h4>');
  
  // Handle sections with emojis and better spacing
  html = html.replace(/^- \*\*(💰 Price:)\*\* (.*$)/gm, '<div class="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400"><div class="flex items-start"><span class="text-xl mr-3 flex-shrink-0">💰</span><div><span class="font-semibold text-green-800">Price:</span><p class="text-green-700 mt-1">$2</p></div></div></div>');
  
  html = html.replace(/^- \*\*(⭐ Rating:)\*\* (.*$)/gm, '<div class="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"><div class="flex items-start"><span class="text-xl mr-3 flex-shrink-0">⭐</span><div><span class="font-semibold text-blue-800">Rating:</span><p class="text-blue-700 mt-1">$2</p></div></div></div>');
  
  html = html.replace(/^- \*\*(📍 Location:)\*\* (.*$)/gm, '<div class="mb-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400"><div class="flex items-start"><span class="text-xl mr-3 flex-shrink-0">📍</span><div><span class="font-semibold text-purple-800">Location:</span><p class="text-purple-700 mt-1">$2</p></div></div></div>');
  
  html = html.replace(/^- \*\*(🛋️ Amenities:)\*\* (.*$)/gm, '<div class="mb-4 p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400"><div class="flex items-start"><span class="text-xl mr-3 flex-shrink-0">🛋️</span><div><span class="font-semibold text-indigo-800">Amenities:</span><p class="text-indigo-700 mt-1">$2</p></div></div></div>');
  
  html = html.replace(/^- \*\*(⏱️ Duration:)\*\* (.*$)/gm, '<div class="mb-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400"><div class="flex items-start"><span class="text-xl mr-3 flex-shrink-0">⏱️</span><div><span class="font-semibold text-orange-800">Duration:</span><p class="text-orange-700 mt-1">$2</p></div></div></div>');
  
  html = html.replace(/^- \*\*(🛑 Stops:)\*\* (.*$)/gm, '<div class="mb-4 p-3 bg-red-50 rounded-lg border-l-4 border-red-400"><div class="flex items-start"><span class="text-xl mr-3 flex-shrink-0">🛑</span><div><span class="font-semibold text-red-800">Stops:</span><p class="text-red-700 mt-1">$2</p></div></div></div>');
  
  html = html.replace(/^- \*\*(💺 Travel Class:)\*\* (.*$)/gm, '<div class="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400"><div class="flex items-start"><span class="text-xl mr-3 flex-shrink-0">💺</span><div><span class="font-semibold text-gray-800">Travel Class:</span><p class="text-gray-700 mt-1">$2</p></div></div></div>');
  
  // Handle any remaining bullet points
  html = html.replace(/^- (.*$)/gm, '<div class="mb-2 p-2 flex items-start"><span class="mr-2 mt-1 text-blue-500">•</span><span class="text-gray-700">$1</span></div>');
  
  // Handle bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  
  // Handle concluding statements
  html = html.replace(/This (hotel|flight) (provides|strikes|offers).*/gi, '<div class="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400"><p class="text-gray-700 italic">$&</p></div>');
  
  // Handle line breaks and paragraphs
  html = html.replace(/\n\n+/g, '</div><div class="mb-4">');
  html = html.replace(/\n/g, ' ');
  
  // Wrap in container
  html = `<div class="ai-recommendation space-y-2">${html}</div>`;
  
  // Clean up empty divs
  html = html.replace(/<div[^>]*><\/div>/g, '');
  html = html.replace(/<div[^>]*>\s*<\/div>/g, '');
  
  return html;
}