import bcrypt from 'bcryptjs'; 

const data = {
    users: [
      {
        name: "Anna",
        email: 'admin@example.com',
        password: bcrypt.hashSync('1234', 8),
        isAdmin: true,
      },
      {
        name: "Eero",
        email: 'user@example.com',
        password: bcrypt.hashSync('12345', 8),
        isAdmin: false,
        },
    ],
    products: [
      {
        name: 'Uniliina Laama',
        category: 'Lelut',
        image: '/images/uniliina_laama.jpg',
        price: 17.50,
        countInStock: 10,
        brand: 'Uni',
        rating: 5,
        numReviews: 10,
        description: "Lapsen ensimmäinen pehmoinen ystävä joka tarjoaa lohtua vaikeina hetkinä ja kulkee mukana loppuelämän."
      },
      {
        name: 'Kettu',
        category: 'Lelut',
        image: '/images/kettu_soittorasia.jpg',
        price: 21.00,
        countInStock: 20,
        brand: 'Teddy',
        rating: 5,
        numReviews: 5,
        description: "Hauskan värikäs soittorasia lempeällä melodialla - Mozart lullaby. Teddykompaniet pehmolelut ovat ihanan pehmoisia ja ne rakastavat halailua."
      },
      {
        name: 'Blue Moon',
        category: 'Lelut',
        image: '/images/mobile_moon_blue.jpg',
        price: 34.50,
        countInStock: 10,
        brand: 'Uni',
        rating: 4,
        numReviews: 1,
        description: "Lapsen ensimmäinen pehmoinen ystävä joka tarjoaa lohtua vaikeina hetkinä ja kulkee mukana loppuelämän."
      },
      {
        name: 'Zuzu',
        category: 'Lelut',
        image: '/images/uniharjottaja_sininen.jpg',
        price: 17.50,
        countInStock: 15,
        brand: 'BoboDream',
        rating: 5,
        numReviews: 10,
        description: "Zuzu uttaa lastasi ymmärtämään ja opettelemaan vuorokausirytmiä, se kertoo pienokaisellesi milloin on aika herätä."
      },
      {
        name: 'Uniliina Muumi',
        category: 'Lelut',
        image: '/images/uniliina_muumi_sininen_1_.jpg',
        price: 15.00,
        countInStock: 0,
        brand: 'UniTeddy',
        rating: 5,
        numReviews: 14,
        description: "Todella pehmoinen ja söpö Muumi uniliina! Lapsen ensimmäinen pehmoinen ystävä joka tarjoaa lohtua vaikeina hetkinä ja kulkee mukana loppuelämän."
      }, 
      {
        name: 'Orava',
        category: 'Lelut',
        image: '/images/squirrel-orava.jpg',
        price: 8.90,
        countInStock: 5,
        brand: 'Frank$Fischer',
        rating: 5,
        numReviews: 14,
        description: "Hauska pieni peili vauvalle, takaosan materiaali valmistettu sertifioidusta luonnonmukaisesti tuotetusta puuvillasta. Peilissä on puuvillainen hihna jossa tarrakiinnitys, joten peili on helposti kiinnitettävissä puuhamaton lelukaareen, lastenvaunuihin tai pinnasänkyyn."
      }
    ]
}

export default data;