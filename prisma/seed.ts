import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const INITIAL_CATEGORIES = [
  {
    id: 'cat-wedding',
    name: 'Wedding Collection',
    slug: 'wedding',
    description: 'Royal groom sherwanis, tuxedos, and opulent wedding suits crafted for unforgettable occasions.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-shirts',
    name: 'Premium Shirts',
    slug: 'shirts',
    description: 'Egyptian cotton formals, linen casuals, and luxury patterned dress shirts.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-tshirts',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Mercerized cotton polos, relaxed oversized tees, and luxury casual wear.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-blazers',
    name: 'Blazers & Tuxedos',
    slug: 'blazers',
    description: 'Tailored Italian cut blazers, double-breasted jackets, and party wear tuxedos.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-sherwani',
    name: 'Sherwani',
    slug: 'sherwani',
    description: 'Regal hand-embroidered zardozi and raw silk groom sherwanis.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-kurta',
    name: 'Kurta Collection',
    slug: 'kurta',
    description: 'Traditional silk kurtas, Jacquard jackets, and modern festivity outfits.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-jeans',
    name: 'Jeans & Denim',
    slug: 'jeans',
    description: 'Premium stretch denim, tapered slim fit, and classic vintage wash jeans.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'cat-pants',
    name: 'Pants & Chinos',
    slug: 'pants',
    description: 'Sharp formal trousers, breathable cotton chinos, and stretch utility pants.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1600&q=80',
  },
];

async function main() {
  console.log('🌱 Reseeding updated images...');

  for (const cat of INITIAL_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, image: cat.image, bannerImage: cat.bannerImage },
      create: cat,
    });
  }

  console.log('🎉 Seed updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
