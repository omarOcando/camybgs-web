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

// Busca el contacto una vez y le añade cada etiqueta por separado: si una
// falla (por ejemplo, un ID mal puesto), las demás se añaden igual.
export const addTagsToSystemeContactByEmail = async (email, tagIds) => {
  const headers = {
    "X-API-Key": process.env.SYSTEME_API_KEY,
    "Content-Type": "application/json",
  };

  let contact;
  try {
    const searchResponse = await axios.get(
      `${SYSTEME_API}?email=${encodeURIComponent(email)}`,
      { headers }
    );
    contact = searchResponse.data?.items?.[0];
  } catch (error) {
    console.error("Error searching Systeme contact:", error.message);
    return;
  }

  if (!contact) {
    console.error(`Systeme contact not found for email: ${email}`);
    return;
  }

  for (const tagId of tagIds) {
    try {
      await axios.post(`${SYSTEME_API}/${contact.id}/tags`, { tagId }, { headers });
    } catch (error) {
      console.error(`Error adding tag ${tagId} to Systeme contact:`, error.response?.data || error.message);
    }
  }
};
