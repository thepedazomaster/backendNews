import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  //create user
  const saltRounds = 10;

  const passHashed = bcrypt.hashSync("myPassword_", saltRounds);

  const bryan = await prisma.user.upsert({
    where: { email: "bryanTest@gmail.com".toLowerCase() },
    update: {},
    create: {
      email: "bryanTest@gmail.com".toLowerCase(),
      password: passHashed,
      person: { create: { name: "bryan", lastname: "Hernandez" } },
    },
  });
  //create Categories
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "sciences",
    "sports",
    "technology",
  ];
  categories.forEach(async (category) => {
    await prisma.categories_news.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });
  });
  //create lenguaje
  const countries = [
    { code: "ae", name: "United Arab Emirates" },
    { code: "ar", name: "Argentina" },
    { code: "at", name: "Austria" },
    { code: "au", name: "Australia" },
    { code: "be", name: "Belgium" },
    { code: "bg", name: "Bulgaria" },
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "ch", name: "Switzerland" },
    { code: "cn", name: "China" },
    { code: "co", name: "Colombia" },
    { code: "cu", name: "Cuba" },
    { code: "cz", name: "Czech Republic" },
    { code: "de", name: "Germany" },
    { code: "eg", name: "Egypt" },
    { code: "fr", name: "France" },
    { code: "gb", name: "United Kingdom" },
    { code: "gr", name: "Greece" },
    { code: "hk", name: "Hong Kong" },
    { code: "hu", name: "Hungary" },
    { code: "id", name: "Indonesia" },
    { code: "ie", name: "Ireland" },
    { code: "il", name: "Israel" },
    { code: "in", name: "India" },
    { code: "it", name: "Italy" },
    { code: "jp", name: "Japan" },
    { code: "kr", name: "South Korea" },
    { code: "lt", name: "Lithuania" },
    { code: "lv", name: "Latvia" },
    { code: "ma", name: "Morocco" },
    { code: "mx", name: "Mexico" },
    { code: "my", name: "Malaysia" },
    { code: "ng", name: "Nigeria" },
    { code: "nl", name: "Netherlands" },
    { code: "no", name: "Norway" },
    { code: "nz", name: "New Zealand" },
    { code: "ph", name: "Philippines" },
    { code: "pl", name: "Poland" },
    { code: "pt", name: "Portugal" },
    { code: "ro", name: "Romania" },
    { code: "rs", name: "Serbia" },
    { code: "ru", name: "Russia" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "se", name: "Sweden" },
    { code: "sg", name: "Singapore" },
    { code: "si", name: "Slovenia" },
    { code: "sk", name: "Slovakia" },
    { code: "th", name: "Thailand" },
    { code: "tr", name: "Turkey" },
    { code: "tw", name: "Taiwan" },
    { code: "ua", name: "Ukraine" },
    { code: "us", name: "United States" },
    { code: "ve", name: "Venezuela" },
    { code: "za", name: "South Africa" },
  ];
  countries.forEach(async (country) => {
    await prisma.country.upsert({
      where: { code: country.code },
      update: {},
      create: { code: country.code, name: country.name },
    });
  });
  //create country
  const lenguages = [
    { code: "ar", name: "Árabe" },
    { code: "de", name: "Alemán" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Francés" },
    { code: "he", name: "Hebreo" },
    { code: "it", name: "Italiano" },
    { code: "nl", name: "Holandés" },
    { code: "no", name: "Noruego" },
    { code: "pt", name: "Portugués" },
    { code: "ru", name: "Ruso" },
    { code: "sv", name: "Sueco" },
    { code: "ud", name: "Indefinido" },
    { code: "zh", name: "Chino" },
  ];
  lenguages.forEach(async (lenguage) => {
    await prisma.lenguage.upsert({
      where: { code: lenguage.code },
      update: {},
      create: { code: lenguage.code, name: lenguage.name },
    });
  });
  //create search type

  const typeSearch = ["topHeadlines", "everything"];

  typeSearch.forEach(async (type) => {
    await prisma.type_search.upsert({
      where: { name: type },
      update: {},
      create: { name: type },
    });
  });

  console.log(bryan);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
