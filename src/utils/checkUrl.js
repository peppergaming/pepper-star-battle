const isUrlFound = async (url) => {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-cache",
    });

    return response.status === 200;
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export default isUrlFound;
