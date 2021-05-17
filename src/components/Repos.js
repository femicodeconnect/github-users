import React, { useContext } from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { ExampleChart, Pie3D } from './charts';

const Repos = () => {
   //destruture repos array from global state
   const { repos } = useContext(GithubContext);

   //use the reduce function to get the languages & the total occurence of a particular language in the array
   let languages = repos.reduce((total, item) => {
      //get the language property for each repo in repos
      const { language } = item;

      //if language is null, move to next iteration
      if (!language) return total;

      console.log(language);

      //for first occurence of a particular language
      if (!total[language]) {
         //total[language] = 1;

         //format into a form usable by the chart
         total[language] = { label: language, value: 1 };
      } else {
         //for another occurence of a particular lang
         //total[language] = total[language] + 1;

         //format into a form usable by the chart
         total[language] = {
            ...total[language],
            value: total[language].value + 1,
         };
      }
      return total;
   }, {});

   console.log(languages);

   //The following will be done on the languages object by chaining
   //1. turning languages object into an array
   //2. sorting the array of languages in order of popularity
   //3. slicing the array to get the first five items in it (if the array has more than 5 elements)
   languages = Object.values(languages)
      .sort((a, b) => {
         return b.value - a.value;
      })
      .slice(0, 5);
   console.log(languages);

   const chartData = [
      {
         label: 'HTML',
         value: '25',
      },
      {
         label: 'CSS',
         value: '80',
      },
      {
         label: 'Javascript',
         value: '142',
      },
   ];

   //passing the languages array as data to be used in the chart
   return (
      <section className='section'>
         <Wrapper className='section-center'>
            <Pie3D data={languages} />
            {/* <ExampleChart data={chartData} />; */}
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
