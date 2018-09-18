export const fetchCarInfo = async (nowid) => {
	const {result} = await fetch(`/carinfo/${nowid}`).then(data=>data.json());
	return result;
}

export const fetchCarLikes = async (nowid) => {
	const {results} = await fetch(`/carlike/${nowid}`).then(data=>data.json());
	return results;
}

export const fetchCarImages = async (nowid) => {
	const {images} = await fetch(`/carimages/${nowid}`).then(data=>data.json());
	return images;
}