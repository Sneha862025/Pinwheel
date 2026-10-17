const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;
const people = {
  mara: { name: 'Mara Okafor', username: 'maraokafor' },
  leo: { name: 'Leo Brandt', username: 'leobrandt' },
  ines: { name: 'Ines Duarte', username: 'inesduarte' },
  kenji: { name: 'Kenji Mori', username: 'kenjimori' },
};
export const creators = Object.values(people);
// Sample data lives here (not in components). Swap this file for an API call later.
export const samplePins = [
  ['Glass atrium at dusk', 'Curved glass and steel catching the last light.', 'photo-1486718448742-163732cd1544', 'Architecture', ['glass', 'modern', 'dusk'], 'leo'],
  ['Brutalist stair study', 'Concrete geometry with hard shadows.', 'photo-1511818966892-d7d671e672a2', 'Architecture', ['concrete', 'brutalist'], 'kenji'],
  ['Spiral library staircase', 'A staircase that curls like a shell.', 'photo-1518005020951-eccb494ad742', 'Architecture', ['stairs', 'spiral'], 'mara'],
  ['Linen layers, autumn', 'Neutral linen pieces for cooler mornings.', 'photo-1445205170230-053b83016050', 'Fashion', ['linen', 'autumn', 'neutral'], 'ines'],
  ['Street style in denim', 'Oversized denim with simple sneakers.', 'photo-1483985988355-763728e1935b', 'Fashion', ['denim', 'street'], 'mara'],
  ['Tailored coat inspiration', 'Sharp shoulders, soft colors.', 'photo-1490481651871-ab68de25d43d', 'Fashion', ['coat', 'tailoring'], 'kenji'],
  ['Weeknight ramen bowl', 'Rich broth, soft egg, spring onion.', 'photo-1569718212165-3a8278d5f624', 'Food', ['ramen', 'noodles', 'dinner'], 'kenji'],
  ['Berry tart with cream', 'Buttery crust and glossy berries.', 'photo-1488477181946-6428a0291777', 'Food', ['dessert', 'berries', 'baking'], 'ines'],
  ['Market tomato salad', 'Heirloom tomatoes, olive oil, flaky salt.', 'photo-1546069901-ba9599a7e63c', 'Food', ['salad', 'summer'], 'leo'],
  ['Santorini white walls', 'Blue domes above the caldera.', 'photo-1570077188670-e3a8d69ac5ff', 'Travel', ['greece', 'island', 'coast'], 'mara'],
  ['Misty mountain trail', 'Early fog over a quiet ridge path.', 'photo-1464822759023-fed622ff2c3b', 'Travel', ['hiking', 'mountains', 'fog'], 'leo'],
  ['Kyoto lantern alley', 'Evening lanterns in a narrow lane.', 'photo-1493976040374-85c8e12f0c0e', 'Travel', ['japan', 'kyoto', 'night'], 'kenji'],
  ['Abstract ink wash', 'Layered ink in slow gradients.', 'photo-1541961017774-22349e4a1262', 'Art', ['ink', 'abstract'], 'ines'],
  ['Gallery wall in color', 'Saturated canvases on a white wall.', 'photo-1578301978693-85fa9c0320b9', 'Art', ['gallery', 'painting', 'color'], 'mara'],
  ['Clay forms, hand built', 'Soft ceramic shapes in earth tones.', 'photo-1565193566173-7a0ee3dbe261', 'Art', ['ceramic', 'clay'], 'ines'],
  ['Sunlit reading corner', 'An armchair, a plant, and good light.', 'photo-1586023492125-27b2c045efd7', 'Interior Design', ['living room', 'cozy', 'plants'], 'leo'],
  ['Warm minimal kitchen', 'Oak cabinets and matte black fixtures.', 'photo-1556909114-f6e7ad7d3136', 'Interior Design', ['kitchen', 'minimal', 'oak'], 'mara'],
  ['Layered bedroom textures', 'Wool, linen, and a low wooden bed.', 'photo-1505693416388-ac5ce068fe85', 'Interior Design', ['bedroom', 'texture'], 'ines'],
  ['Rain on city glass', 'Neon reflections after the storm.', 'photo-1519501025264-65ba15a82390', 'Photography', ['city', 'rain', 'night'], 'kenji'],
  ['Portrait in window light', 'Soft side light and a quiet expression.', 'photo-1494790108377-be9c29b29330', 'Photography', ['portrait', 'natural light'], 'leo'],
  ['Golden hour field', 'Tall grass backlit by low sun.', 'photo-1500382017468-9049fed747ef', 'Photography', ['landscape', 'golden hour'], 'mara'],
].map(([title, description, photo, category, tags, who], i) => ({
  id: `sample-${i + 1}`, title, description, image: u(photo), creator: people[who], category, tags,
  createdAt: new Date(2025, 0, 1 + i).toISOString(),
}));
