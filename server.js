const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// פנקס הקודים הסודיים! 
// כל קוד שתוסיף כאן עם active: true יוכל להיכנס לתוכנה
const licensesDatabase = {
  "LEV-TOV-PREMIUM-2026": { active: true, name: "מנוי premium לב טוב" },
  "MOSHE-PREMIUM-770": { active: true, name: "משה מנוי VIP" }
};

// פה המלך עונה לשומר בטלפון
app.post('/api/verify-license', (req, res) => {
  const { licenseKey } = req.body;

  if (!licenseKey) {
    return res.json({ success: false, error: "לא נשלח מפתח רישיון!" });
  }

  const license = licensesDatabase[licenseKey.trim()];

  if (license && license.active) {
    // מפתח תקין ורשום בפנקס!
    return res.json({ success: true, active: true });
  } else {
    // מפתח שגוי או לא פעיל
    return res.json({ success: false, error: "מפתח הרישיון שגוי או שפג תוקפו של המנוי." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});