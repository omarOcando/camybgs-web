import axios from "axios";

const SYSTEME_API = "https://api.systeme.io/api/contacts";

// Etiqueta "consentimiento-emails": solo la reciben quienes marcan la casilla
// del formulario. Las campañas deben enviarse únicamente a esta etiqueta.
export const EMAIL_CONSENT_TAG_ID = 2222022;

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
  const headers = {
    "X-API-Key": process.env.SYSTEME_API_KEY,
    "Content-Type": "application/json",
  };

  try {
    const searchResponse = await axios.get(
      `${SYSTEME_API}?email=${encodeURIComponent(email)}`,
      { headers }
    );
    const contact = searchResponse.data?.items?.[0];

    if (!contact) {
      console.error(`Systeme contact not found for email: ${email}`);
      return;
    }

    await axios.post(`${SYSTEME_API}/${contact.id}/tags`, { tagId }, { headers });
  } catch (error) {
    console.error(`Error adding tag ${tagId} to Systeme contact:`, error.response?.data || error.message);
  }
};
