import { Button, Result } from 'antd';
import Page from '../components/Page';
import StakingRequestWelcomeCard from '../components/staking/StakingRequestWelcomeCard';
import StakingOptionCard from '../components/staking/StakingOptionCard';

const baseStakingDescription = 'Staking is the process of actively';
const WelcomePage = () => (
  <Page title="Welcome to ETNY Staking Page | ETNY">
    <div className="bg-white dark:bg-gray-700 relative max-w-screen-xl mx-auto">
      <div className="bg-white dark:bg-gray-700 flex relative items-center overflow-hidden">
        <div className="container mx-auto px-6 flex relative py-16">
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative">
            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12" />
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
              Staking
              <span className="text-5xl sm:text-7xl">on Ethernity</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white">
              Staking is the process of holding tokens in a cryptocurrency wallet to support the operations of a
              network. Participants are rewarded for depositing and holding coins, with constant guaranteed time-based
              returns. Rewards are calculated based on staking time: the longer you stake, the more you earn.
            </p>
            <div className="flex items-center justify-between mt-8 w-full">
              <a
                href="#"
                className="uppercase py-2 mr-1 w-full rounded-2xl
                bg-blue-500 border-2 border-transparent
                text-center text-white text-md
                font-medium
                hover:bg-blue-400 hover:text-white
                transition-colors duration-200"
              >
                <span className="flex items-center justify-center">
                  Connect Wallet
                  <span className="pl-2">
                    <svg
                      className="text-white"
                      enableBackground="new 0 0 48 48"
                      height="32px"
                      id="Layer_1"
                      version="1.1"
                      viewBox="0 0 48 48"
                      width="32px"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        fill="#fff"
                        d="M47,40L47,40c0,2.762-2.238,5-5,5l0,0H6l0,0c-2.762,0-5-2.238-5-5V11  c0-2.209,1.791-4,4-4l0,0h20.171l8.099-2.934c0.513-0.187,1.081,0.078,1.268,0.589L35.391,7H39c2.209,0,4,1.791,4,4v2l0,0  c2.209,0,4,1.791,4,4V40z M5,9L5,9c-1.104,0-2,0.896-2,2s0.896,2,2,2h3.445l0,0h0.189c0.013-0.005,0.021-0.016,0.034-0.021L19.65,9  H5z M34.078,9.181l-1.062-2.924l-0.001,0v0L30.964,7h0.003l-5.514,2h-0.01l-11.039,4h21.062L34.078,9.181z M41,11  c0-1.104-0.896-2-2-2h-2.883l1.454,4H41l0,0V11z M43,15H5l0,0c-0.732,0-1.41-0.211-2-0.555V40c0,1.657,1.344,3,3,3h36  c1.657,0,3-1.343,3-3v-7h-4c-2.209,0-4-1.791-4-4s1.791-4,4-4h4v-8C45,15.896,44.104,15,43,15z M45,31v-4h-4c-1.104,0-2,0.896-2,2  s0.896,2,2,2H45z M41,28h2v2h-2V28z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                </span>
              </a>
              <a
                href="#"
                className="uppercase py-2 ml-1 w-full rounded-2xl
                bg-blue-500 border-2 border-transparent
                text-center text-white text-md
                font-medium
                hover:bg-blue-400 hover:text-white
                transition-colors duration-200"
              >
                <span className="flex items-center justify-center">
                  Read more
                  <span className="pl-2">
                    <svg
                      id="Layer_1"
                      version="1.1"
                      viewBox="0 0 100.4 100.4"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      height="32px"
                      width="32px"
                    >
                      <g>
                        <path
                          fill="#fff"
                          d="M92.9,60.4l-7.4-5v-15l7.4-4.9c0.4-0.3,0.7-0.7,0.7-1.2c0-0.5-0.3-1-0.7-1.2L54.8,7.5c-0.5-0.3-1.2-0.3-1.7,0L6.1,38.9   c-0.2,0.1-0.3,0.2-0.4,0.4c0,0,0,0,0,0.1c-0.2,0.3-0.2,0.5-0.2,0.8v27.5c0,0.5,0.3,1,0.7,1.2l38.1,25.4c0.3,0.2,0.5,0.3,0.8,0.3   c0.3,0,0.6-0.1,0.8-0.3l47.1-31.4c0.4-0.3,0.7-0.7,0.7-1.2C93.6,61.1,93.3,60.6,92.9,60.4z M54,10.6l35.4,23.6L83.6,38   c-0.3,0.1-0.6,0.3-0.8,0.5L45,63.7L16.6,44.8c-0.1-0.1-0.2-0.1-0.2-0.2l-6.8-4.5L54,10.6z M17.1,48.8l27,18c0.5,0.3,1.2,0.3,1.7,0   l36.7-24.5v12.3L45.2,79.2l-28.1-18L17.1,48.8L17.1,48.8z M45,91.2L8.4,66.8V43l5.8,3.8V62c0,0.5,0.3,1,0.7,1.3l29.6,19   c0.2,0.2,0.5,0.2,0.8,0.2c0.3,0,0.6-0.1,0.8-0.2l37.4-24.6l5.9,4L45,91.2z"
                        />
                        <path
                          fill="#fff"
                          d="M47.5,24.3l17.8,12.2c0.3,0.2,0.6,0.3,0.8,0.3c0.5,0,0.9-0.2,1.2-0.7c0.5-0.7,0.3-1.6-0.4-2.1L49.2,21.8   c-0.7-0.5-1.6-0.3-2.1,0.4C46.6,22.9,46.8,23.8,47.5,24.3z"
                        />
                      </g>
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative text-right">
            <img alt="ddd" src="/static/img_icn_cloud.svg" className="max-w-xs md:max-w-sm m-auto" />
          </div>
        </div>
      </div>

      <div>
        <p className="font-bebas-neue uppercase text-center text-4xl font-bold dark:text-white text-gray-800">
          Staking options
        </p>
        <p className="text-center mb-12 text-xl font-normal dark:text-white text-gray-500">
          Ethernity Cloud Staking Dapp allows stakers to allocate staking requests to operators node. The actions are
          performed through the Dapp using the SmartContract
        </p>

        <div className="bg-white dark:bg-gray-700 flex flex-wrap relative justify-between	overflow-hidden p-2">
          <StakingOptionCard
            title="Base"
            description="Some short description that needs to be added"
            apr="12.5"
            maturityPeriod="6M"
            poolSize={55}
            percent={50}
          />
          <StakingOptionCard
            title="Extended"
            description="Some short description that needs to be added"
            apr="30"
            maturityPeriod="2Y"
            poolSize={35}
            percent={25}
            // pro={['Pro1', 'Pro2', 'Pro2', 'Pro2']}
            // cons={['Pro1', 'Pro2', 'Pro2']}
          />
          <StakingOptionCard
            title="Other"
            description="Some short description that needs to be added"
            apr="50"
            maturityPeriod="5Y"
            poolSize={15}
            percent={90}
            // pro={['Pro1', 'Pro2', 'Pro2', 'Pro2']}
            // cons={['Pro1', 'Pro2', 'Pro2']}
          />
        </div>
      </div>

      <div className="py-8 px-3 bg-white dark:bg-gray-700">
        <p className="font-bebas-neue uppercase text-center text-4xl font-bold dark:text-white text-gray-800">
          Staking Calculator
        </p>
        <p className="text-center mb-12 text-xl font-normal dark:text-white text-gray-500">
          Ethernity Cloud Staking Dapp allows stakers to allocate staking requests to operators node. The actions are
          performed through the Dapp using the SmartContract
        </p>
        <StakingRequestWelcomeCard
          type="base"
          title="Base Staking Request"
          description={baseStakingDescription}
          pro={['Pro1', 'Pro1', 'Pro1', 'Pro1', 'Pro1', 'Pro1', 'Pro1', 'Pro1']}
          cons={['Cons1', 'Const2']}
        />

        {/* <StakingRequestWelcomeCard */}
        {/*  type="base" */}
        {/*  title="Extended Staking Request" */}
        {/*  description={baseStakingDescription} */}
        {/*  pro={['Pro1', 'Pro1', 'Pro1', 'Pro1', 'Pro1', 'Pro1', 'Pro1', 'Pro1']} */}
        {/*  cons={['Cons1', 'Const2']} */}
        {/* /> */}
      </div>

      <div className="rounded-2xl m-2 py-8 px-3 bg-white dark:bg-gray-800">
        <p className="font-bebas-neue uppercase text-center text-2xl font-bold dark:text-blue-500 text-gray-800">
          Time to
        </p>
        <p className="font-bebas-neue text-center text-4xl font-bold dark:text-white text-gray-800">
          Become an <span className="uppercase text-blue-500">Investor</span>
        </p>

        <p className="mt-2 text-center text-gray-400 dark:text-white text-lg">
          Contact us on our Telegram Chanel for any questions or problems with staking process.
        </p>

        <div className="flex items-center justify-center mx-auto mt-12">
          <svg
            id="Layer_1"
            width="60"
            height="60"
            version="1.1"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <circle fill="#2DAFDF" cx="256" cy="256" r="256" />
              <g>
                <path
                  fill="#FFFFFF"
                  d="M380.6,147.3l-45.7,230.5c0,0-6.4,16-24,8.3l-105.5-80.9L167,286.7l-64.6-21.7c0,0-9.9-3.5-10.9-11.2    c-1-7.7,11.2-11.8,11.2-11.8l256.8-100.7C359.5,141.2,380.6,131.9,380.6,147.3z"
                />
                <path
                  fill="#D2E4F0"
                  d="M197.2,375.2c0,0-3.1-0.3-6.9-12.4c-3.8-12.1-23.3-76.1-23.3-76.1l155.1-98.5c0,0,9-5.4,8.6,0    c0,0,1.6,1-3.2,5.4c-4.8,4.5-121.8,109.7-121.8,109.7"
                />
                <path fill="#B5CFE4" d="M245.8,336.2l-41.7,38.1c0,0-3.3,2.5-6.8,0.9l8-70.7" />
              </g>
            </g>
          </svg>
          <a className="text-md text-gray-700 dark:text-gray-50 ml-4 text-2xl" href="https://t.me/ethernity.cloud">
            https://t.me/ethernitycloud
          </a>
        </div>

        {/* <div className="relative p-4 overflow-hidden sm:px-6 sm:py-6 lg:p-6 xl:p-6"> */}
        {/*  <h2 className="text-2xl font-semibold font-display text-black dark:text-white sm:text-3xl"> */}
        {/*    We&#x27;ve got more coming... */}
        {/*  </h2> */}
        {/*  <p className="mt-2 max-w-xl text-base text-gray-400"> */}
        {/*    Contact us on our Telegram Chanel for any questions or problem with staking process. */}
        {/*  </p> */}
        {/*  <form> */}
        {/*    <div className="sm:flex justify-start mt-6"> */}
        {/*      <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center"> */}
        {/*        <div className="relative"> */}
        {/*          <input */}
        {/*            type="text" */}
        {/*            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" */}
        {/*            placeholder="Email" */}
        {/*          /> */}
        {/*        </div> */}
        {/*        <button */}
        {/*          className="flex-shrink-0 uppercase py-2 px-4 rounded-md bg-blue-500 */}
        {/*           border-2 border-transparent text-center text-white text-md mr-4 */}
        {/*           font-medium hover:bg-blue-400 hover:text-white transition-colors duration-200" */}
        {/*          type="submit" */}
        {/*        > */}
        {/*          Subscribe */}
        {/*        </button> */}
        {/*      </form> */}
        {/*    </div> */}
        {/*  </form> */}
        {/* </div> */}
      </div>

      {/* <div className="py-8 px-3 bg-white"> */}
      {/*  <p className="font-bebas-neue uppercase text-center text-4xl font-bold text-gray-800"> */}
      {/*    The TEAM behind the project */}
      {/*  </p> */}
      {/*  <p className="text-center mb-12 text-xl font-normal text-gray-500"> */}
      {/*    The design of the smart contracts and the underlying infrastructure is backed by a team which cumulates more */}
      {/*    than 60 years of experience in cloud computing field and a technology that has been developed successfully */}
      {/*    over the past 5 years. */}
      {/*  </p> */}
      {/*  <div className="flex items-center flex-col md:flex-row justify evenly justify-center"> */}
      {/*    <div className="p-4"> */}
      {/*      <div className="text-center mb-4 opacity-90"> */}
      {/*        <a href="#" className="block relative"> */}
      {/*          <img */}
      {/*            alt="iosif.jpg" */}
      {/*            src="/static/team/iosif.jpg" */}
      {/*            className="mx-auto object-cover rounded-full h-40 w-40 " */}
      {/*          /> */}
      {/*        </a> */}
      {/*      </div> */}
      {/*      <div className="text-center"> */}
      {/*        <p className="font-bebas-neue text-2xl text-gray-800 font-bold">Iosif Peterfi</p> */}
      {/*        <p className="text-xl text-gray-500 font-bold">Founder & CEO</p> */}
      {/*        <p className="text-md text-gray-700 max-w-xs py-4"> */}
      {/*          Visionary cumulating over 20 years of experience filling cornerstone tech infrastructure roles at US */}
      {/*          Department of Defense and Max Planck Digital Library */}
      {/*        </p> */}
      {/*      </div> */}
      {/*      <div className="pt-8 flex border-t border-gray-200 w-44 mx-auto text-gray-500 items-center justify-between"> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*          > */}
      {/*            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*    <div className="p-4"> */}
      {/*      <div className="text-center mb-4 opacity-90"> */}
      {/*        <a href="#" className="block relative"> */}
      {/*          <img */}
      {/*            alt="vlad.jpg" */}
      {/*            src="/static/team/vlad.jpg" */}
      {/*            className="mx-auto object-cover rounded-full h-40 w-40 " */}
      {/*          /> */}
      {/*        </a> */}
      {/*      </div> */}
      {/*      <div className="text-center"> */}
      {/*        <p className="font-bebas-neue text-2xl text-gray-800 font-bold">Vladimir Radu-Radulescu</p> */}
      {/*        <p className="text-xl text-gray-500 font-bold">COO</p> */}
      {/*        <p className="text-md text-gray-700 max-w-xs py-4"> */}
      {/*          Visionary cumulating over 20 years of experience filling cornerstone tech infrastructure roles at US */}
      {/*          Department of Defense and Max Planck Digital Library */}
      {/*        </p> */}
      {/*      </div> */}
      {/*      <div className="pt-8 flex border-t border-gray-200 w-44 mx-auto text-gray-500 items-center justify-between"> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*          > */}
      {/*            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*    <div className="p-4"> */}
      {/*      <div className="text-center mb-4 opacity-90"> */}
      {/*        <a href="#" className="block relative"> */}
      {/*          <img */}
      {/*            alt="florin.jpg" */}
      {/*            src="/static/team/florin.jpg" */}
      {/*            className="mx-auto object-cover rounded-full h-40 w-40 " */}
      {/*          /> */}
      {/*        </a> */}
      {/*      </div> */}
      {/*      <div className="text-center"> */}
      {/*        <p className="font-bebas-neue text-2xl text-gray-800 font-bold">Florin Nedelcu</p> */}
      {/*        <p className="text-xl text-gray-500 font-bold">CTO</p> */}
      {/*        <p className="text-md text-gray-700 max-w-xs py-4"> */}
      {/*          Visionary cumulating over 20 years of experience filling cornerstone tech infrastructure roles at US */}
      {/*          Department of Defense and Max Planck Digital Library */}
      {/*        </p> */}
      {/*      </div> */}
      {/*      <div className="pt-8 flex border-t border-gray-200 w-44 mx-auto text-gray-500 items-center justify-between"> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*          > */}
      {/*            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*        <a href="#"> */}
      {/*          <svg */}
      {/*            width="30" */}
      {/*            height="30" */}
      {/*            fill="currentColor" */}
      {/*            className="text-xl hover:text-gray-800 transition-colors duration-200" */}
      {/*            viewBox="0 0 1792 1792" */}
      {/*            xmlns="http://www.w3.org/2000/svg" */}
      {/*          > */}
      {/*            <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z" /> */}
      {/*          </svg> */}
      {/*        </a> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </div> */}
    </div>

    <footer className="bg-white dark:bg-gray-800 w-full mt-12 py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex max-w-xs mx-auto items-center justify-between">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
              viewBox="0 0 1792 1792"
            >
              <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z" />
            </svg>
          </a>
        </div>
        <ul className="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-between list-none pt-8">
          <li className="my-2">
            <a
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              href="#"
            >
              FAQ
            </a>
          </li>
          <li className="my-2">
            <a
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              href="#"
            >
              Configuration
            </a>
          </li>
          <li className="my-2">
            <a
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              href="#"
            >
              Github
            </a>
          </li>
          <li className="my-2">
            <a
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              href="#"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </Page>
);

export default WelcomePage;
