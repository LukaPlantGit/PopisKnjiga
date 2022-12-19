const arr = [
    {
    "Ime": "Mersault",
    "Prezime": "H"
    },
    {
    "Ime": "Marie",
    "Prezime": "A"
    },
    {
    "Ime": "Salaman",
    "Prezime": "HA"
    }
    ]

arr.forEach(element => {
    imelika = element.Ime;
    prezimelika = element.Prezime;

    console.log(imelika + "...." + prezimelika)
});