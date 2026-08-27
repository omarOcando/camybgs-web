import axios from "axios";

const SYSTEME_API = "https://api.systeme.io/api/contacts";

export const createSystemeContact = async (name, email) => {
  try {
    await axios.post(
      SYSTEME_API,
      {
        email: email,
        fields: [
          { slug: "first_name", value: name },
        ],
      },
      {
        headers: {
            "X-API-Key": process.env.SYSTEME_API_KEY,
            "Content-Type": "application/json",
        }
      }
    );

  } catch (error) {
    console.error("Error creating Systeme contact:", error.response?.data || error.message);
  }
};

export const addTagToSystemeContactByEmail = async (email, tagId) => {
  try {
    const searchResponse = await axios.get(
      `${SYSTEME_API}?email=${encodeURIComponent(email)}`,
      {
        headers: {
          "X-API-Key": process.env.SYSTEME_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const contact = searchResponse.data?.items?.[0];

    if (!contact) {
      console.error(`Systeme contact not found for email: ${email}`);
      return;
    }

    await axios.post(
      `https://api.systeme.io/api/contacts/${contact.id}/tags`,
      {
        tagId,
      },
      {
        headers: {
          "X-API-Key": process.env.SYSTEME_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Error adding tag to Systeme contact:", error.message);
  }
};
