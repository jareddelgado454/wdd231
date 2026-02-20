
export async function fetchDojos() {
  try {
    const response = await fetch('data/dojos.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.dojos;
  } catch (error) {
    console.error('Error fetching dojos:', error);
    const saved = localStorage.getItem('dojos');
    if (saved) {
      return JSON.parse(saved);
    }
    throw error;
  }
}
