// About.js

import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 50px;
  text-align: center;
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const AboutHeading = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const AboutDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const TeamMemberImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 30%;
`;

const TeamMemberName = styled.h3`
  font-size: 1.5rem;
  margin-top: 10px;
`;

const About = () => {
  return (
    <AboutSection>
      <AboutContent>
        <AboutHeading>About Our Store</AboutHeading>
        <AboutDescription>
          Welcome to our online store! At [Your Store Name], we are passionate about [your store's mission].
          Founded in [year], our store has been dedicated to [describe your store's journey and commitment to quality].
        </AboutDescription>

        <TeamContainer>
          <TeamMember>
            <TeamMemberImage src="https://e1.pxfuel.com/desktop-wallpaper/58/760/desktop-wallpaper-anil-kumar-chowdary-jr-ntr-tdp.jpg" alt="Founder 1" />
            <TeamMemberName>John Doe</TeamMemberName>
            <p>Co-Founder and CEO</p>
          </TeamMember>

          <TeamMember>
            <TeamMemberImage src="https://files.oyebesmartest.com/uploads/preview/scrape-wp56409800bzxcbxk.jpeg" alt="Founder 2" />
            <TeamMemberName>Jane Smith</TeamMemberName>
            <p>Co-Founder and Creative Director</p>
          </TeamMember>
        </TeamContainer>

        {/* Add more team members if needed */}

        <AboutDescription>
          We take pride in delivering high-quality products and providing an exceptional shopping experience
          for our customers. Our commitment to [core values] has earned us [awards/accolades] and the trust
          of our valued customers.
        </AboutDescription>

        {/* Add more sections like achievements, testimonials, community involvement, etc. */}

        <AboutDescription>
          Join us on this exciting journey as we continue to [your store's vision]. Explore our collection
          and find the perfect products that resonate with your lifestyle.
        </AboutDescription>
      </AboutContent>
    </AboutSection>
  );
};

export default About;
