export const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log('📩 Contact Message:', {
    name,
    email,
    subject,
    message,
  });

  res.json({
    success: true,
    message: 'Thanks for reaching out to Wema!',
  });
};
