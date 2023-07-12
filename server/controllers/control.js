import fetch from "cross-fetch";
export const getWhether = async (req, res, next) => {
  try {
    const { city } = req.body;

    const url = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({
      success: true,
      response: data,
      message: "Whether Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
