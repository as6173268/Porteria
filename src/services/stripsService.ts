/**
 * Service for fetching comic strips data
 * Reads from local /data/strips.json file
 */

export interface ComicStrip {
  id: string;
  title: string | null;
  image_url: string;
  publish_date: string;
  media_type?: 'image' | 'video' | 'audio';
  video_url?: string;
  audio_url?: string;
}

interface StripsData {
  strips: ComicStrip[];
}

/**
 * Fetch strips from local JSON file
 */
export async function fetchStrips(): Promise<ComicStrip[]> {
  try {
    const response = await fetch('/data/strips.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: StripsData = await response.json();
    
    // Return strips sorted by date (most recent first)
    return data.strips.sort((a, b) => {
      const dateA = new Date(a.publish_date);
      const dateB = new Date(b.publish_date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching strips:', error);
    throw error;
  }
}

/**
 * Get the latest strip
 */
export async function getLatestStrip(): Promise<ComicStrip | null> {
  try {
    const strips = await fetchStrips();
    return strips.length > 0 ? strips[0] : null;
  } catch (error) {
    console.error('Error getting latest strip:', error);
    return null;
  }
}

/**
 * Get a strip by ID
 */
export async function getStripById(id: string): Promise<ComicStrip | null> {
  try {
    const strips = await fetchStrips();
    return strips.find(strip => strip.id === id) || null;
  } catch (error) {
    console.error('Error getting strip by ID:', error);
    return null;
  }
}
