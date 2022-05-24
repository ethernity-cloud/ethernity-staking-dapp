import { Button, Col, Collapse, Row, Space } from 'antd';
import { ArrowRightOutlined, DownOutlined, WalletFilled } from '@ant-design/icons';
import React from 'react';
import { FaDiscord, FaFacebook, FaGithub, FaLinkedin, FaTelegram, FaTwitter } from 'react-icons/fa';
import Page from '../components/Page';
import StakingCalculatorCard from '../components/staking/StakingCalculatorCard';
import StakingOptionCard from '../components/staking/StakingOptionCard';
import SectionIcon from '../components/icons/SectionIcon';
import CalculatorIcon from '../components/icons/CalculatorIcon';
import { FooterButton } from '../components/buttons/FooterButton';
import { SocialIconButton } from '../components/buttons/SocialIconButton';

const { Panel } = Collapse;

const baseStakingDescription = 'Staking is the process of actively';
const text = `
 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. 
`;

const WelcomePage = () => (
  <Page title="Welcome to ETNY Staking Page | ETNY">
    <div className="bg-white dark:bg-etny-background">
      <Row className="flex items-center overflow-hidden bg-square-pattern bg-contain bg-center py-16">
        <div className="lg:hidden mx-8 w-full h-60 text-right bg-logo-mobile-pattern bg-contain bg-no-repeat bg-center" />
        <Row className="max-w-screen-xl mx-auto container mx-auto px-6 flex md:py-16">
          <Col className="sm:w-4/5 lg:w-2/5 flex flex-col mx-auto">
            <span className="w-20 h-2 bg-etny-500 mb-12" />
            <h1 className="uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
              <span className="text-etny-500">Staking</span>
              <span className="text-5xl sm:text-7xl">on Ethernity Cloud</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white">
              Staking is the process of holding tokens in a cryptocurrency wallet to support the operations of a
              network. Participants are rewarded for depositing and holding coins, with constant guaranteed time-based
              returns. Rewards are calculated based on staking time: the longer you stake, the more you earn.
            </p>
            <div className="flex items-center justify-between mt-8 w-full space-x-4">
              <Button
                size="large"
                className="h-12 w-full
                bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
                text-white hover:text-white focus:text-white
                border-0 rounded-md"
              >
                Connect Wallet
                <WalletFilled />
              </Button>

              <Button
                size="large"
                className="h-12 w-full
                bg-white hover:bg-etny-secondary-button-hover focus:bg-etny-secondary-button-focus
                text-etny-orange-500 hover:text-etny-orange-500 focus:text-etny-orange-500
                border-2 border-primary hover:border-primary dark:border-0 rounded-md"
              >
                Read More
                <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
          <Col className="hidden lg:block lg:w-3/5 mx-auto">
            <img alt="hero" src="/static/hero.png" className="max-w-3xl mx-auto" />
          </Col>
        </Row>
      </Row>

      <div className="bg-white dark:bg-etny-background my-12">
        <div className="mx-auto mx-12 py-16 bg-etny-500 dark:bg-etny-900 bg-pattern-1 bg-cover bg-no-repeat bg-center rounded-lg">
          <div className="max-w-screen-lg mx-auto py-16 bg-transparent">
            <Row justify="center" align="bottom" className="space-x-6">
              <SectionIcon />
              <p className="text-center text-4xl font-bold text-white">Staking options</p>
            </Row>
            <p className="text-center my-12 text-xl font-normal text-white">
              Ethernity Cloud Staking Dapp allows stakers to allocate staking requests to operators node.
              <br />
              <span className="text-center mb-12 text-xl font-normal text-white">
                The actions are performed through the Dapp using the SmartContract.
              </span>
            </p>

            <Row justify="center" align="middle" gutter={[32, 32]} className="overflow-hidden p-2">
              <Col key="1" xl={12} lg={12} md={12} sm={24} xs={24}>
                <StakingOptionCard
                  title="Base Staking"
                  description="Some short description that needs to be added.Some short description that needs to be added"
                  apr="Up to 10"
                  maturityPeriod="Unlimited"
                  poolSize={150}
                  rewardSplit="100%"
                />
              </Col>
              <Col key="2" xl={12} lg={12} md={12} sm={24} xs={24}>
                <StakingOptionCard
                  title="Extended Staking"
                  description="Some short description that needs to be added.Some short description that needs to be added."
                  apr="Up to 10"
                  maturityPeriod="Min 6Months"
                  poolSize={150}
                  rewardSplit="Negotiable"
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-etny-background">
        <div className="max-w-screen-xl mx-auto py-8 px-3">
          <Row justify="center" align="bottom" className="space-x-6">
            <CalculatorIcon />
            <p className="text-center text-4xl font-bold dark:text-white text-gray-800">Staking calculator</p>
          </Row>
          <p className="text-center my-12 text-xl font-normal dark:text-white text-gray-500">
            Ethernity Cloud Staking Dapp allows stakers to allocate staking requests to operators node.
            <br />
            <span className="text-center mb-12 text-xl font-normal dark:text-white text-gray-500">
              The actions are performed through the Dapp using the SmartContract.
            </span>
          </p>
          <StakingCalculatorCard
            type="base"
            title="Base Staking Request"
            description={baseStakingDescription}
            pro={[
              'Pros 1 description goes here. Pros 1 description goes here. Pros 1 description goes here',
              'Pros 1 description goes here. Pros 1 description goes here. Pros 1 description goes here',
              'Pros 1 description goes here. Pros 1 description goes here. Pros 1 description goes here'
            ]}
            cons={['Cons1', 'Const2']}
          />
        </div>
      </div>

      <div className="bg-etny-500 dark:bg-etny-900">
        <div className="max-w-screen-xl mx-auto mt-20 py-16 px-3">
          <Row justify="center" align="bottom" className="space-x-6">
            <p className="text-center text-4xl font-bold text-white">Frequently Asked Questions</p>
          </Row>
          <p className="text-center my-12 text-xl font-normal text-white">
            Here are answers to some of the questions our community has asked us.
            <br />
            <span className="text-center mb-12 text-xl font-normal text-white">
              Get in touch if there’s more you would like to know.
            </span>
          </p>

          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <DownOutlined className={isActive ? 'text-white' : 'text-primary'} rotate={isActive ? 180 : 0} />
            )}
            className="welcome-faq-collapse dark:welcome-faq-collapse"
          >
            <Panel
              header={<span className="text-etny-500">What is Staking?</span>}
              key="1"
              className="welcome-faq-collapse-panel dark:welcome-faq-collapse-panel"
            >
              <p className="text-black">
                Staking is the process of holding tokens in a cryptocurrency wallet to support the operations of the
                network. Participant are rewarded for depositing and holding coins with constant guaranteed time-based
                returns.
              </p>
            </Panel>
            <Panel
              header={<span className="text-etny-500">How often can I withdraw my rewards?</span>}
              key="2"
              className="welcome-faq-collapse-panel dark:welcome-faq-collapse-panel"
            >
              <p className="text-black">{text}</p>
            </Panel>
            <Panel
              header={<span className="text-etny-500">What is the minimum and maximum staking amount?</span>}
              key="3"
              className="welcome-faq-collapse-panel dark:welcome-faq-collapse-panel"
            >
              <p className="text-black">{text}</p>
            </Panel>
            <Panel
              header={<span className="text-etny-500">What happens after staking?</span>}
              key="4"
              className="welcome-faq-collapse-panel dark:welcome-faq-collapse-panel"
            >
              <p className="text-black">{text}</p>
            </Panel>
          </Collapse>
        </div>

        <div className="bg-etny-500 dark:bg-transparent">
          <div className="bg-square-pattern bg-cover bg-no-repeat bg-center bg-top">
            <div className="bg-pattern-2 bg-contain bg-no-repeat bg-bottom py-40">
              <div className="max-w-screen-xl mx-auto py-16 px-3">
                <Row justify="center" align="bottom" className="space-x-6">
                  <p className="text-center text-4xl font-bold text-white">
                    Interested? Become and <span className="text-black dark:text-etny-500">Investor</span> today.
                  </p>
                </Row>
                <p className="text-center my-6 text-xl font-normal text-white">
                  Join our Telegram Community for support and ask us any questions you have.
                </p>

                <Row justify="center" align="middle" className="space-x-6">
                  <Button
                    size="large"
                    className="h-12 w-64 bg-etny-button-primary hover:bg-etny-button-hover hover:text-white focus:bg-etny-button-focus focus:text-white text-white border-0 rounded-md"
                  >
                    <Row justify="space-around" align="middle">
                      Join Our Community
                      <FaTelegram className="ml-2" />
                    </Row>
                  </Button>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white dark:bg-black w-full py-16">
        <div className="max-w-screen-xl mx-auto px-4 space-y-20">
          <Row justify="space-between" align="middle">
            <FooterButton>About US</FooterButton>
            <FooterButton>Careers</FooterButton>
            <FooterButton>Partnerships</FooterButton>
            <FooterButton>Configuration</FooterButton>
            <FooterButton>FAQs</FooterButton>
            <FooterButton>Privacy Policy</FooterButton>
            <FooterButton>Terms & Conditions</FooterButton>
          </Row>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Row justify="center">
                <span className="text-black dark:text-white">© 2022. Ethernity CLOUD Ltd. All rights reserved.</span>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row justify="center">
                <Space size="large">
                  <SocialIconButton>
                    <FaFacebook className="h-6 w-6" />
                  </SocialIconButton>
                  <SocialIconButton>
                    <FaLinkedin className="h-6 w-6" />
                  </SocialIconButton>
                  <SocialIconButton>
                    <FaTelegram className="h-6 w-6" />
                  </SocialIconButton>
                  <SocialIconButton>
                    <FaDiscord className="h-6 w-6" />
                  </SocialIconButton>
                  <SocialIconButton>
                    <FaGithub className="h-6 w-6" />
                  </SocialIconButton>
                  <SocialIconButton>
                    <FaTwitter className="h-6 w-6" />
                  </SocialIconButton>
                </Space>
              </Row>
            </Col>
          </Row>
        </div>
      </footer>
    </div>
  </Page>
);

export default WelcomePage;
