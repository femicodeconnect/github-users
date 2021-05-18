import React, { useContext } from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { ExampleChart, Pie3D, Doughnut2D, Column3D, Bar3D } from './charts';

const Repos = () => {
   //destruture repos array from global state
   const { repos } = useContext(GithubContext);

   const languages = repos.reduce((total, item) => {
      const { language, stargazers_count } = item;

      //if language is null, move to next iteration
      if (!language) return total;

      //for first occurence of a particular language
      if (!total[language]) {
         //total[language] = 1;

         //format into a form usable by the chart
         total[language] = {
            label: language,
            value: 1,
            stars: stargazers_count,
         };
      } else {
         //for another occurence of a particular lang
         //total[language] = total[language] + 1;

         //format into a form usable by the chart
         total[language] = {
            ...total[language],
            value: total[language].value + 1,
            stars: total[language].stars + stargazers_count,
         };
      }
      return total;
   }, {});

   console.log(languages);

   //For most used language sorting ---
   //The following will be done on the languages object by chaining
   //1. turning languages object into an array
   //2. sorting the array of languages in order of popularity
   //3. slicing the array to get the first five items in it (if the array has more than 5 elements)
   const mostUsed = Object.values(languages)
      .sort((a, b) => {
         return b.value - a.value;
      })
      .slice(0, 5);
   console.log(mostUsed);

   //For most stars per language sorting ---
   //The following will be done on the languages object by chaining
   //1. turning languages object into an array.
   //2. sorting the array of languages in order of stars per language.
   //3. replace the value in the value property of the object with the value of the star property in the object since it is the value property (not stars property) that will be used in the chart.
   //4. slicing the array to get the first five items in it (if the array has more than 5 elements)
   const mostPopular = Object.values(languages)
      .sort((a, b) => {
         return b.stars - a.stars;
      })
      .map((item) => {
         return { ...item, value: item.stars };
      })
      .slice(0, 5);
   console.log(mostPopular);

   //stars, forks
   let { stars, forks } = repos.reduce(
      (total, item) => {
         const { stargazers_count, name, forks } = item;

         total.stars[stargazers_count] = {
            label: name,
            value: stargazers_count,
         };

         total.forks[forks] = {
            label: name,
            value: forks,
         };

         return total;
      },
      {
         stars: {},
         forks: {},
      }
   );

   //The following transformation will be done on both the stars & forks object by chaining
   //1. turning stars object into an array.
   //2. get the last 5 star object items since they have the highest values for their value property.
   //3. reverse the items in the array so that we can have the item with the highest figure in the value property to be the first element in the array
   stars = Object.values(stars).slice(-5).reverse();
   console.log(stars);

   forks = Object.values(forks).slice(-5).reverse();
   console.log(stars);

   return (
      <section className='section'>
         <Wrapper className='section-center'>
            <Pie3D data={mostUsed} />
            <Column3D data={stars} />
            <Doughnut2D data={mostPopular} />
            <Bar3D data={forks} />
         </Wrapper>
      </section>
   );
};

const Wrapper = styled.div`
   display: grid;
   justify-items: center;
   gap: 2rem;
   @media (min-width: 800px) {
      grid-template-columns: 1fr 1fr;
   }

   @media (min-width: 1200px) {
      grid-template-columns: 2fr 3fr;
   }

   //the code below makes the chart container responsive

   div {
      width: 100% !important;
   }
   .fusioncharts-container {
      width: 100% !important;
   }
   svg {
      width: 100% !important;
      border-radius: var(--radius) !important;
   }
`;

export default Repos;
