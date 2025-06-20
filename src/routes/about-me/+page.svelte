<script lang="ts">
  import AboutHero from '$lib/components/AboutHero.svelte';
  import TimelineEvent from '$lib/components/TimelineEvent.svelte';

  type TimelineSide = 'left' | 'right';
  
  interface TimelineEventType {
      date: string;
      title: string;
      description: string;
      side: TimelineSide;
    }
    
  // Sample data for the timeline. This data is AI generated because I was lazy. I will be updating it with my actual experiences later.
  const timelineEvents: TimelineEventType[] = [
    {
      date: 'June 2025 - Present',
      title: 'Personal Portfolio Project',
      description: 'Began working on a personal portfolio project to groom my online presence and showcase my skills and projects. This project is a work in progress, but I am excited to share it with the world once it is complete.',
      side: 'left'
    },
    {
      date: 'June 9th, 2024',
      title: 'Just Married!',
      description: 'I married Rebecca, my best friend, in the North Georgia Mountains. Rebecca has been my biggest supporter and has encouraged me to pursue my dreams. I am so grateful to have her in my life.',
      side: 'right'
    },
    {
      date: '2024 - Present',
      title: 'Software Engineer at Wetmore Enterprises',
      description: 'As a full-stack developer, I contributed to several different projects, including co-engineering a lead distribution SaaS from concept to having active users in just five months. I modernized business operations by migrating over 150,000 records to a centralized database and automating manual processes. I experienced rapid growth, and developed data management skills and the ability to deliver impactful solutions in a fast paced, agile environemnt.',
      side: 'left'
    },
    {
      date: '2023 - 2024',
      title: 'Marketing Representative at RangeWater Real Estate',
      description: 'I worked as a top performing marketing and property management professional with expereience in the competitive Atlanta multi-family real estate market. I successfully managed property operations, including vendor relations and maintenance, while handling high-volume communications and resident relations. I was recognized as an "Ultimate Leaser," and I took on some project management and introductory IT responsibilities. This is where I began to use software development in my professional life, and I started to learn more about the field.',
      side: 'right'
    },
    {
      date: '2022 - 2023',
      title: 'Sous Chef at Marietta Melt Yard',
      description: 'I opened a new restaurant in Marietta, GA, as the opening sous chef. I helped to develop the menu, manage inventory, train staff, and ensure high standards of food quality and safety. This experience honed my ability to work under intense pressure, manage multiple tasks simultaneously, and maintain a high level of attention to detail.',
      side: 'left'
    },
    {
      date: '2019 - 2023',
      title: 'Line Cook at Prime 120',
      description: 'I worked as a line cook at Prime 120, a high-end steakhouse in Woodstock, GA. I was responsible for preparing and cooking food to order, ensuring that all dishes met the restaurant\'s high standards of quality and presentation. This experience quickly taught me to work efficiently under intense pressure, manage my time effectively, and maintain a high level of attention to detail.',
      side: 'right'
    },
    {
      date: '2018 - 2019',
      title: 'Bartender at Partners Pizza',
      description: 'I worked as a bartender at Partners Pizza, a popular local restaurant in Woodstock, GA. I was responsible for preparing and serving drinks, managing the bar area, and serving food to customers. This experience taught me how to work in a fast-paced environment, manage multiple tasks simultaneously, and maintain a positive attitude under pressure.',
      side: 'left'
    },
    {
      date: '2017 - 2019',
      title: 'Server/Bartender at ICE Martini Bar',
      description: 'I worked as a server and bartender at ICE Martini Bar, a popular local bar in Woodstock, GA. I was responsible for serving drinks, managing the bar area, and providing excellent customer service. This was my introduction to the service industry, and I obtained ServeSafe certification during this time. I developed many different skills during this time that I would carry with me throughout my career.',
      side: 'right'
    },
    {
      date: '2015 - 2019',
      title: 'Attended Kennesaw State University',
      description: 'I attended Kennesaw State University, where I studied psychology. I learned about human behavior, cognitive processes, and social interactions. This experience helped me to develop a strong understanding of how people think and behave, which has been invaluable in my career as a software engineer.',
      side: 'left'
    },
    {
      date: '2015',
      title: 'Graduated from Sequoyah High School',
      description: 'I graduated from Sequoyah High School in Canton, GA. During my time there, I was involved in various extracurricular activities and developed a strong work ethic and an intense drive to learn that has carried me through my career. Through multiple introductory computer science classes, I discovered my passion for software development and began to explore the field further.',
      side: 'right'
    },
    {
      date: '2015 - 2017',
      title: 'Senior Game Advisor at GameStop',
      description: 'I worked as a Senior Game Advisor at GameStop, where I was responsible for providing excellent customer service, managing inventory, and assisting with sales. This helped fan the fire of my interest in technology and gaming, which eventually led me to pursue a career in software development.',
      side: 'left'
    },
    {
      date: '2014 - 2015',
      title: 'First Job at Kroger',
      description: 'I started my first job at Kroger, where I worked as a courtesy clerk. This experience taught me the importance of hard work, responsibility, and customer service. I learned how to manage my time effectively, work in a team, and communicate with customers.',
      side: 'right'
    },
    {
      date: '2008',
      title: 'First Programming Language!',
      description: 'I wrote my first program in the 6th grade using Visual Basic. I created a simple calculator program that could perform basic arithmetic operations. This experience sparked my interest in programming and I quickly began to explore the possibilites of software development. I built several small projects, and learned to tinker with game console file systems in order to mod games. This was the beginning of my journey into the world of software development.',
      side: 'left'
    },
    {
      date: 'June 14th, 1997',
      title: 'Born in Palm Beach Gardens, Florida',
      description: 'I was born in Palm Beach Gardens, Florida, and moved to Roswell, Georgia when I was too young to remember. At age 5, my family moved to Woodstock, Georgia. Growing up as an only child in Woodstock, I had lots of free time by myself, where I developed a love for technology and gaming. This passion eventually led me to pursue a career in software development.',
      side: 'right'
    },
    {
      date: 'approx. 11,700 B.C.E.',
      title: 'Beginning of the Holocene Epoch',
      description: 'The Holocene Epoch began around 11,700 years ago, marking the end of the last Ice Age and the beginning of a warmer and more stable climate. This period saw the rise of human civilization, with the development of agriculture, the domestication of animals, and the establishment of permanent settlements. The Holocene has been characterized by significant changes in the Earth\'s climate, ecosystems, and human societies.',
      side: 'left'
    },
    {
      date: '2.6 Million B.C.E. - 11,700 B.C.E.',
      title: 'Pleistocene Epoch',
      description: 'The Pleistocene Epoch, also known as the Ice Age, lasted from about 2.6 million years ago to around 11,700 years ago. It was characterized by repeated glaciations, where large ice sheets covered much of the Northern Hemisphere. The Pleistocene saw the evolution and extinction of many species, including the woolly mammoth and saber-toothed cat. It was during this time that early humans began to develop tools and migrate across the globe.',
      side: 'right'
    },
    {
      date: '66 Million B.C.E. - Present',
      title: 'Cenozoic Era',
      description: 'The Cenozoic Era, also known as the Age of Mammals, began around 66 million years ago and continues to the present day. It is characterized by the rise of mammals and birds, the diversification of flowering plants, and significant geological and climatic changes. The Cenozoic has seen the evolution of many modern species, including humans, and has been marked by several mass extinctions and climate shifts.',
      side: 'left'
    },
    {
      date: '252 Million B.C.E. - 66 Million B.C.E.',
      title: 'Mesozoic Era',
      description: 'The Mesozoic Era, also known as the Age of Reptiles, lasted from about 252 million years ago to around 66 million years ago. It was characterized by the dominance of dinosaurs, the evolution of birds and mammals, and the development of flowering plants. The Mesozoic saw significant geological and climatic changes, including the breakup of the supercontinent Pangaea and the rise of modern continents. Some of the characters of the hit film "Jurassic Park" were based on dinosaurs from this era.',
      side: 'right'
    },
    {
      date: '541 Million B.C.E. - 252 Million B.C.E.',
      title: 'Paleozoic Era',
      description: 'The Paleozoic Era lasted from about 541 million years ago to around 252 million years ago. It was characterized by the diversification of marine life, the evolution of land plants and animals, and significant geological changes. The Paleozoic saw the development of complex ecosystems, including coral reefs, forests, and amphibians, and ended with one of the largest mass extinctions in Earth\'s history.',
      side: 'left'
    },
    {
      date: '2.5 Billion B.C.E. - 541 Million B.C.E.',
      title: 'Proterozoic Eon',
      description: 'The Proterozoic Eon lasted from about 2.5 billion years ago to around 541 million years ago. It was characterized by the development of simple life forms, including bacteria and algae, and the gradual buildup of oxygen in the atmosphere. The Proterozoic saw the emergence of multicellular organisms and the first evidence of sexual reproduction, setting the stage for the explosion of life in the subsequent Paleozoic Era.',
      side: 'right'
    },
    {
      date: '4 Billion B.C.E. - 2.5 Billion B.C.E.',
      title: 'Archean Eon',
      description: 'The Archean Eon lasted from about 4 billion years ago to around 2.5 billion years ago. It was characterized by the formation of the Earth\'s crust, the development of the first continents, and the emergence of simple life forms, primarily prokaryotic microorganisms. The Archean saw the establishment of the planet\'s earliest ecosystems and the beginning of biological processes that would shape the Earth\'s atmosphere and geology.',
      side: 'left'
    },
    {
      date: '4.6 Billion B.C.E. - 4 Billion B.C.E.',
      title: 'Hadean Eon',
      description: 'The Hadean Eon lasted from the formation of the Earth around 4.6 billion years ago to about 4 billion years ago. It was characterized by the planet\'s initial formation, the cooling of its surface, and the development of the first solid crust. The Hadean saw intense volcanic activity, the formation of the Moon, and the establishment of conditions that would eventually allow for the emergence of life.',
      side: 'right'
    },
    {
      date: '13.8 Billion B.C.E.',
      title: 'The Big Bang',
      description: 'The Big Bang is the leading explanation for the origin of the universe, occurring approximately 13.8 billion years ago. It marks the beginning of space and time, as well as the formation of all matter and energy in the universe. The Big Bang theory describes how the universe expanded from an extremely hot and dense state, leading to the formation of galaxies, stars, and planets over billions of years.',
      side: 'left'
    }
  ];
</script>

<main class="about-page-container">
  <AboutHero />

  <div class="timeline-container">
    {#each timelineEvents as event}
      <TimelineEvent 
        date={event.date}
        title={event.title}
        description={event.description}
        side={event.side}
      />
    {/each}
  </div>
</main>

<style>
    .about-page-container {
        background-color: #f0f8ff;
        color: #333;
        min-height: calc(100vh - 80px);
    }

    .timeline-container {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
    }

    .timeline-container::after {
        content: '';
        position: absolute;
        width: 6px;
        background-color: #ccdbe6;
        top: 0;
        bottom: 0;
        left: 50%;
        margin-left: -3px;
        z-index: 1;
    }
</style>