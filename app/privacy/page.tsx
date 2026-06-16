import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-scale-1">
      <header className="flex h-16 items-center border-b border-scale-6 px-6">
        <Link
          href="/"
          className="text-sm text-scale-11 hover:text-scale-12 transition-colors"
        >
          &larr; Back
        </Link>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-scale-12">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-sm text-scale-10">
            <span>Last Modified: 13 May 2026</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-scale-11 leading-relaxed space-y-6 [&_h2]:text-scale-12 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-scale-12 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-scale-11 [&_p]:leading-relaxed [&_ul]:text-scale-11 [&_ul]:space-y-2 [&_li]:text-scale-11">
          <p>
            Thank you for your interest in Supabase, Inc., (&ldquo;Supabase,&rdquo; &ldquo;we&rdquo;, &ldquo;our&rdquo; or
            &ldquo;us&rdquo;). Supabase provides a suite of open source tools, stitched together to build a
            seamless developer experience. This Privacy Notice explains how information about you,
            that directly identifies you, or that makes you identifiable (&ldquo;personal information&rdquo;) is
            collected, used and disclosed by Supabase in connection with our website at
            supabase.com (the &ldquo;Site&rdquo;) and our services offered in connection with the Site
            (collectively with the Site, the &ldquo;Service&rdquo;).
          </p>

          <h2 id="what-does-this-privacy-notice-apply-to">What Does This Privacy Notice Apply To?</h2>
          <p>
            This Privacy Notice explains how we use your personal information when you use the
            Service, either as an individual customer or when you access the Service through one of
            our enterprise customers&rsquo; accounts. We are the data controller of your personal
            information when we use it as described in this Privacy Notice, meaning that we
            determine and are responsible for how your personal information is processed.
          </p>
          <p>
            Our Service allows customers to submit, manage or otherwise use content relating to
            others, such as end users of applications built and managed through the Service or their
            employees and contractors (&ldquo;Customer Data&rdquo;). We use such Customer Data primarily as a
            processor, meaning we process such Customer Data on behalf of and under the instructions
            of the relevant customer, in accordance with our data processing addendum. This Privacy
            Notice does not apply to such processing; if you believe your personal information has
            been included in any Customer Data, we recommend you read the Privacy Notice of the
            respective customer.
          </p>
          <p>
            This Privacy Notice sets out how we use personal information. It does not cover our use
            of information that is not &ldquo;personal information&rdquo;, &ldquo;personal information&rdquo; or similar
            terms under applicable law. This means that it does not cover our use of aggregated or
            anonymized information.
          </p>
          <p>
            Where applicable law permits, it also does not cover deidentified information, meaning
            information that is maintained in a form that is not reasonably capable of being
            associated with or linked to an individual (please note that this exception would not
            apply to personal information collected from you if you are in the UK, EEA or
            Switzerland).
          </p>
          <p>
            We may also provide you with additional privacy notices or disclosures where the scope
            of the inquiry, request, or personal information we require falls outside the scope of
            this Privacy Notice. In that case, the additional Privacy Notice or disclosures will set
            out how we may process the information you provide at that time. Please note that this
            Privacy Notice does not cover or apply to our processing of information about our
            employees or contractors or applicants for positions at Supabase.
          </p>

          <h2 id="region-specific-disclosures">Region-specific Disclosures</h2>
          <p>
            <strong>California</strong> &mdash; Your California Privacy Rights: If you are a California
            resident, California Civil Code Section 1798.83 permits you to request information
            regarding the disclosure of personal information to third parties for their direct
            marketing purposes during the immediately preceding calendar year. We may use tracking
            tools to measure the performance of our advertising campaigns and help deliver
            personalized ads. You can manage your preferences in the Privacy Settings.
          </p>
          <p>
            <strong>Nevada</strong> &mdash; Chapter 603A of the Nevada Revised Statutes permits a Nevada
            resident to opt out of future sales of certain covered information that a website
            operator has collected or will collect about the resident. Note we do not sell your
            personal information within the meaning of Chapter 603A. However, if you would still
            like to submit such a request, please contact us at privacy@supabase.com.
          </p>
          <p>
            <strong>European Economic Area, United Kingdom or Switzerland</strong> &mdash; If you are located
            in the European Economic Area (&ldquo;EEA&rdquo;), United Kingdom or Switzerland, or otherwise
            engage with Supabase&rsquo;s European operations, please see the Privacy Disclosures for the
            European Economic Area, United Kingdom and Switzerland for additional European-specific
            privacy disclosures, including the lawful bases we rely on to process your personal
            information, how we use cookies when you access our Sites from the EEA, UK or
            Switzerland and your rights in respect of your personal information.
          </p>
          <p>
            <strong>Note for International Visitors</strong> &mdash; Personal information may be transferred
            to, stored and processed in a country other than the one in which it was collected. For
            example, the Sites are primarily hosted in and provided from the United States. Please
            note the country to which personal data is transferred may not provide the same level of
            protection for personal information as the country from which it was transferred.
          </p>

          <div className="border border-scale-6 rounded-md p-4 my-8 bg-scale-2">
            <p className="text-sm text-scale-11">
              Click on the links below to jump to each section:
            </p>
            <ul className="mt-2 space-y-1">
              <li><a href="#1-information-we-collect-and-our-use" className="text-brand hover:text-brand-hover transition-colors text-sm">1. Information we collect and our use</a></li>
              <li><a href="#2-how-we-share-personal-information" className="text-brand hover:text-brand-hover transition-colors text-sm">2. How we share personal information</a></li>
              <li><a href="#3-control-over-your-information" className="text-brand hover:text-brand-hover transition-colors text-sm">3. Control over your information</a></li>
              <li><a href="#4-how-we-use-cookies-and-other-tracking-technology" className="text-brand hover:text-brand-hover transition-colors text-sm">4. How we use cookies and other tracking technology to collect information</a></li>
              <li><a href="#5-data-retention-and-security" className="text-brand hover:text-brand-hover transition-colors text-sm">5. Data retention and security</a></li>
              <li><a href="#6-links-to-third-party-websites-and-services" className="text-brand hover:text-brand-hover transition-colors text-sm">6. Links to third-party websites and services</a></li>
              <li><a href="#7-childrens-privacy" className="text-brand hover:text-brand-hover transition-colors text-sm">7. Children&rsquo;s privacy</a></li>
              <li><a href="#8-changes-to-privacy-notice" className="text-brand hover:text-brand-hover transition-colors text-sm">8. Changes to this privacy notice</a></li>
              <li><a href="#9-contact-us" className="text-brand hover:text-brand-hover transition-colors text-sm">9. Contact us</a></li>
            </ul>
          </div>

          <h2 id="1-information-we-collect-and-our-use">1. Information we collect and our use</h2>
          <p>
            We collect personal information in connection with your visits to and use of the
            Service. This collection includes information that you provide in connection with the
            Service, information from third parties, and information that is collected automatically
            such as through the use of cookies and other technologies.
          </p>

          <h3>Information That You Provide</h3>
          <p>
            We collect personal information that you submit directly to us. The categories of
            information we collect can include:
          </p>
          <p>
            <strong>Registration information.</strong> We collect personal and/or business information that
            you provide when you register for an account on the Site. This information may include
            your name, email address, and GitHub username. We use this information to administer
            your account, provide you with the relevant services and information, communicate with
            you regarding your account, the Site and for customer support purposes.
          </p>
          <p>
            <strong>Payment information.</strong> If you make a purchase or payment on the Site, such as for
            a subscription, we collect transactional information provided in connection with your
            purchase or payment. Please note that we use third party payment processors, including
            Stripe, to process payments made to us. As such, we do not retain any personally
            identifiable financial information such as credit card numbers. Rather, all such
            information is provided directly by you to our third-party processor. The payment
            processor&rsquo;s use of your personal information is governed by their privacy notice. To
            view Stripe&rsquo;s privacy notice, please visit: https://stripe.com/privacy.
          </p>
          <p>
            <strong>Communications.</strong> If you communicate with us through any paper or electronic form,
            we may collect your name, email address, mailing address, phone number, or any other
            personal information you choose to provide to us. We use this information to investigate
            and respond to your inquiries, and to communicate with you, to enhance the services we
            offer to our users and to manage and grow our organization. If you register for our
            newsletters or updates, we may communicate with you by email. To unsubscribe from
            promotional messages, please follow the instructions within our messages and review the
            Control Over Your Information section below. If you become a contributor, we may also
            collect your GitHub name and feature you on our website.
          </p>
          <p>
            <strong>Inquiries and Feedback.</strong> If you contact us, we will collect the information that
            you provide us, such as your contact information and the contents of your communication
            with us.
          </p>
          <p>
            You are free to choose which personal information you want to provide to us or whether
            you want to provide us with personal information at all. However, some information, such
            as your name, address, payment transaction information, and information on your
            requested Services may be necessary for the performance of our contractual obligations.
          </p>
          <p>
            After registration, you may create, upload or transmit files, documents, videos, images,
            data or information as part of your use of the Service (collectively, &ldquo;User Content&rdquo;).
            This includes any inputs you provide to our AI-powered support tools and outputs
            generated in response to your inputs. User Content and any information contained in the
            User Content, including personal information you may have included, is stored and
            collected as part of the Service. You have full control of the information included in
            the User Content.
          </p>

          <h3>Information from Third Party Sources</h3>
          <p>
            We may receive personal information about you from our business partners and service
            providers and combine this information with other data we collect from you. The
            third-parties may include website and service operators, payment processors, and
            marketing partners. The information may include contact information, demographic
            information, information about your communications and related activities, and
            information about your orders. We may use this information to administer and facilitate
            our services, your orders and our marketing activities.
          </p>
          <p>
            <strong>Single Sign-On.</strong> We use single sign-on (&ldquo;SSO&rdquo;) such as GitHub to allow a user to
            authenticate their account using one set of login information. We will have access to
            certain information from those third parties in accordance with the authorization
            procedures determined by those third parties, including, for example, your name,
            username, email address, language preference, and profile picture. We use this
            information to operate, maintain, and provide to you the features and functionality of
            the Service. We may also send you service-related emails or messages (e.g., account
            verification, purchase confirmation, customer support, changes or updates to features of
            the Site, technical and security notices).
          </p>
          <p>
            <strong>Social Media.</strong> When you interact with our Site through various social media, such
            as when you click on the social media icon on the Site, follow us on a social media
            site, or post a comment to one of our pages, we may receive information from the social
            network such as your profile information, profile picture, user name, user ID associated
            with your social media account, and any other information you permit the social network
            to share with third parties. The data we receive is dependent upon your privacy settings
            with the social network. We use this information to operate, maintain, and provide to
            you the features and functionality of the Service, as well as to communicate directly
            with you, such as to send you email messages about products and services that may be of
            interest to you.
          </p>
          <p>
            <strong>Information from Other Sources.</strong> We may obtain information from other sources,
            including through third-party information providers, our shareholders, customers, or
            through transactions such as mergers and acquisitions. We may combine this information
            with other information we collect from or about you. In these cases, our Privacy Notice
            governs the handling of the combined personal information. We use this information to
            operate, maintain, and provide to you the features and functionality of the Service, as
            well as to communicate directly with you, such as to send you email messages about
            products and services that may be of interest to you.
          </p>

          <h3>Other Uses of Personal Information</h3>
          <p>
            In addition to the uses described above, we may collect and use personal information for
            the following purposes:
          </p>
          <ul>
            <li>For our business activities, including to operate the Service and to provide you with the features and functionality of the Service;</li>
            <li>To communicate with you and respond to your requests, such as to respond to your questions, contact you about changes to the Service, and communicate about account related matters;</li>
            <li>For marketing and advertising purposes, such as to market to you or offer you with information and updates on our products or services we think that you may be interested in, unless you have opted not to receive such information;</li>
            <li>For analytics and research purposes;</li>
            <li>To enforce our Terms of Service, to resolve disputes, to carry out our obligations and enforce our rights, and to protect our business interests and the interests and rights of third parties;</li>
            <li>To comply with contractual and legal obligations and requirements;</li>
            <li>To fulfill any other purpose for which you provide personal information; and</li>
            <li>For any other lawful purpose, or other purpose that you consent to.</li>
          </ul>

          <h2 id="2-how-we-share-personal-information">2. How we share personal information</h2>
          <p>
            We may share your personal information in the instances described below. For further
            information on your choices regarding your information, see Control Over Your
            Information.
          </p>
          <p>
            We may share your personal information with third-party service providers or business
            partners who help us deliver or improve our Site or services, or who perform services on
            our behalf. These third parties are subject to reasonable confidentiality terms and
            provisions restricting their use of your personal information, and may include parties
            that process payments and coordinate billing, provide web hosting services, assist with
            our AI powered services, provide analytics, or help us send and segment marketing
            communications.
          </p>
          <p>
            Third parties as required by law or subpoena or if we reasonably believe that such
            action is necessary to (a) comply with the law and the reasonable requests of law
            enforcement; (b) to enforce our Terms of Service or other agreements or to protect the
            security or integrity of the Supabase services, including to prevent harm or financial
            loss, or in connection with preventing fraud or illegal activity; and/or (c) to exercise
            or protect the rights, property, or personal safety of Supabase, our Customers,
            visitors, or others.
          </p>
          <p>
            We may share with other companies and brands owned or controlled by Supabase, and other
            companies owned by or under common ownership as Supabase. These companies will use your
            personal information in the same way as we can under this Privacy Notice.
          </p>
          <p>
            We may transfer any information we collect in the event we sell or transfer all or a
            portion of our business or assets (including any shares in the company) or any portion
            or combination of our products, services, businesses and/or assets. Should such a
            transaction occur (whether a divestiture, merger, acquisition, bankruptcy, dissolution,
            reorganization, liquidation, or similar transaction or proceeding), we will use
            reasonable efforts to ensure that any transferred information is treated in a manner
            consistent with this Privacy Notice.
          </p>
          <p>
            We may disclose your information publicly or with another third party with your prior
            authorization.
          </p>
          <p>
            With others in an aggregated or otherwise anonymized form that does not reasonably
            identify you directly or indirectly as an individual.
          </p>
          <p>
            <strong>Advertising and Audience Management.</strong> We may share limited personal information,
            such as contact identifiers (including email addresses or cryptographic hashes of email
            addresses), with advertising and marketing partners to create, manage, and measure
            advertising audiences. This may include using hashed identifiers to match or exclude
            existing users from marketing campaigns, measure advertising effectiveness, or prevent
            ads from being shown to individuals who have already registered for our services. These
            partners may use this information in accordance with their applicable terms and privacy
            policies for advertising audience management and related measurement purposes.
          </p>

          <h2 id="3-control-over-your-information">3. Control over your information</h2>

          <h3>Email Communications</h3>
          <p>
            From time to time, we may send you emails regarding updates to our Service, products or
            services, notices about our organization, or information about products/services we offer
            (or promotional offers from third parties) that we think may be of interest to you. Our
            marketing emails may include tracking technologies to help us understand whether an email
            was opened or a link was clicked within the email. This helps us assess engagement and
            improve the relevance of our communications to you. If you wish to unsubscribe from such
            emails, simply click the &ldquo;unsubscribe link&rdquo; provided at the bottom of the email
            communication. Note that you cannot unsubscribe from certain services-related email
            communications (e.g., account verification, confirmations of transactions, technical or
            legal notices).
          </p>

          <h3>Modifying Account Information</h3>
          <p>
            If you have an online account with us, you have the ability to modify certain
            information in your account (e.g., your contact information) through the account options
            provided on the Site. If you have provided consent to share certain data with third-party
            partners in relation to our AI-powered services, you can update your preferences or
            withdraw your consent at any time through your account settings. If there is personal
            information in your User Content, you can use the features and functionality of the
            Service to edit or delete the personal information or User Content. Not all personal
            information is maintained in a format that you can access or change. If you would like to
            request access to, or correction or deletion of personal information, you may send your
            request to us at the email provided below. We will review your request and may require
            you to provide additional information to identify yourself, but we do not promise that we
            will be able to satisfy your request.
          </p>

          <h2 id="4-how-we-use-cookies-and-other-tracking-technology">4. How We Use Cookies and Other Tracking Technology to Collect Information</h2>
          <p>
            We, and our third-party partners, automatically collect certain types of usage
            information when you visit our Site. We typically collect this information through a
            variety of tracking technologies, including cookies, web beacons, embedded scripts,
            location-identifying technologies, file information, and similar technology
            (collectively, &ldquo;tracking technologies&rdquo;).
          </p>
          <p>
            We, and our third-party partners, use tracking technologies to automatically collect
            usage and device information, such as:
          </p>
          <ul>
            <li>Information about your device and its software, such as your IP address, browser type, Internet service provider, device type/model/manufacturer, operating system, date and time stamp, and a unique ID that allows us to uniquely identify your browser or your account;</li>
            <li>When you access our sites from a mobile device, we may collect unique identification numbers associated with your device or our mobile application mobile carrier, device type, model and manufacturer, mobile device operating system brand and model;</li>
            <li>Information about the way you access and use our services, for example, the site from which you came and the site to which you are going when you leave our services, the pages you visit, the links you click, whether you open emails or click the links contained in emails, whether you access the services from multiple devices, and other actions you take on the Site.</li>
          </ul>
          <p>
            We use the data collected through tracking technologies to: (a) remember information so
            that you will not have to re-enter it during your visit or the next time you visit the
            site; (b) provide custom content and information; (c) identify you across multiple
            devices; (d) provide and monitor the effectiveness of our services; (e) monitor
            aggregate metrics such as total number of visitors, traffic, usage, and demographic
            patterns on our Site; (f) diagnose or fix technology problems; and (g) to provide, plan
            for, and enhance our services.
          </p>
          <p>
            We may use tracking technologies to measure the effectiveness of our advertising
            campaigns and to help deliver personalized ads. These tools may collect information
            about your interactions with our ads and websites, which can be used to analyze
            advertising metrics and tailor ads specifically to you. You can manage your preferences
            for such tracking technologies in the Privacy Settings.
          </p>
          <p>
            <strong>Cookies and Other Tracking Technologies Opt-Out.</strong> Depending on your browser or
            mobile device, you may be able to set your browser to delete or notify you of cookies
            and other tracking technology by actively managing the settings on your browser or
            mobile device. If you would prefer not to accept cookies, most browsers will allow you
            to: (i) change your browser settings to notify you when you receive a cookie, which lets
            you choose whether or not to accept it; (ii) disable existing cookies; or (iii) set your
            browser to automatically reject cookies. Please note that doing so may negatively impact
            your experience using the sites, as some features and services on our sites may not work
            properly. Depending on your mobile device and operating system, you may not be able to
            delete or block all cookies. You may also set your e-mail options to prevent the
            automatic downloading of images that may contain technologies that would allow us to
            know whether you have accessed our e-mail and performed certain functions with it.
          </p>

          <h2 id="5-data-retention-and-security">5. Data Retention and Security</h2>
          <p>
            We will retain your personal information for the length of time needed to fulfill the
            purposes outlined in this Privacy Notice, unless a longer retention period is required
            or permitted by law. We store data on servers in the U.S. or any other country in which
            Supabase or its affiliates, subsidiaries, agents or contractors maintain facilities.
            Your personal information may be transferred to and stored outside of your state,
            province, country, or other governmental jurisdiction where the data protection laws may
            differ from those in your jurisdiction. When you register for use with Supabase you have
            the option to select where you store your information and we will not transfer it
            without providing information to you in advance.
          </p>
          <p>
            Supabase cares about the security of your information and uses commercially reasonable
            physical, technical and organizational measures designed to preserve the integrity and
            security of all information we collect. However, no security system is impenetrable, and
            we cannot guarantee the security of our systems 100%. In the event that any information
            under our control is compromised as a result of a breach of security, we will take
            reasonable steps to investigate the situation and where appropriate, notify those
            individuals whose information may have been compromised and take other steps, in
            accordance with any applicable laws and regulations.
          </p>

          <h2 id="6-links-to-third-party-websites-and-services">6. Links to Third-Party Websites and Services</h2>
          <p>
            For your convenience, our Site may provide links to third-party websites or services
            that we do not own or operate. We are not responsible for the practices employed by any
            websites or services linked to or from the services, including the information or
            content contained within them. Your browsing and interaction on any other website or
            service are subject to the applicable third party&rsquo;s rules and policies, not ours. If you
            are using a third-party website or service, you do so at your own risk. We encourage you
            to review the privacy policies of any site or service before providing any personal
            information.
          </p>

          <h2 id="7-childrens-privacy">7. Children&rsquo;s Privacy</h2>
          <p>
            Our services are not intended for children under the age of 13. We do not knowingly
            solicit or collect personal information from children under the age of 13. If we learn
            that any personal information has been collected inadvertently from a child under 13, we
            will delete the information as soon as possible. If you believe that we might have
            collected information from a child under 13, please contact us at privacy@supabase.com.
          </p>

          <h2 id="8-changes-to-privacy-notice">8. Changes to Privacy Notice</h2>
          <p>
            We reserve the right to change this Privacy Notice from time to time in our sole
            discretion. We will notify you about material changes in the way we treat personal
            information in an appropriate manner, such as by sending a notice to the primary email
            address specified in your Supabase account, placing a prominent notice on our Site
            and/or other appropriate methods. It is your responsibility to review this Privacy
            Notice periodically. When we do change the Privacy Notice, we will also revise the
            &ldquo;last modified&rdquo; date.
          </p>

          <h2 id="9-contact-us">9. Contact Us</h2>
          <p>
            For additional inquiries about this Privacy Notice, please send us an email at
            privacy@supabase.com.
          </p>

          <div className="border-t border-scale-6 my-12 pt-8">
            <h2 className="!mt-0" id="privacy-disclosures-eea-uk-switzerland">Privacy disclosures for the European economic area, United Kingdom, and Switzerland.</h2>
            <p>
              The following disclosures (&ldquo;Privacy Disclosures&rdquo;) apply to you if you access or use the
              Site or the Services from the European Economic Area, United Kingdom or Switzerland.
            </p>
            <p>
              Supabase, Inc is the data controller of your personal information when we use it as
              described in these Privacy Disclosures, meaning that we determine and are responsible
              for how your personal information is processed.
            </p>
          </div>

          <h2 id="1-personal-information-you-provide-to-us">1. Personal Information You Provide To Us</h2>
          <p>
            We collect the following categories of personal information that you submit directly to
            us when you use the Service:
          </p>

          <h3>(a) Contact information</h3>
          <p>Such as first name, last name and email address.</p>
          <ul>
            <li><strong>How we may use it:</strong> To set up and authenticate your account, communicate with you, deal with enquiries, and send marketing communications (with consent).</li>
            <li><strong>Legal bases:</strong> Performance of a contract, legitimate interests, consent (for marketing).</li>
            <li><strong>Recipients:</strong> Stripe, Orb, Hubspot, Amazon Web Services, Google Cloud, Postmark, Twilio, Fly.io, PandaDoc, Atlassian, front.com, Clazar, Hex.tech, Clay, Customer.io.</li>
          </ul>

          <h3>(b) Registration / account information</h3>
          <p>Email address and password, or GitHub SSO data.</p>
          <ul>
            <li><strong>How we may use it:</strong> To create your account on the Service.</li>
            <li><strong>Legal bases:</strong> Performance of a contract.</li>
            <li><strong>Recipients:</strong> GitHub, Amazon Web Services.</li>
          </ul>

          <h3>(c) Payment transaction and billing information</h3>
          <p>Billing address, Tax ID, transaction date and time, products/services purchased.</p>
          <ul>
            <li><strong>How we may use it:</strong> To process orders and collect payment, verify identity for fraud prevention.</li>
            <li><strong>Legal bases:</strong> Performance of a contract, legitimate interests (fraud detection).</li>
            <li><strong>Recipients:</strong> Stripe, Orb, Tableau, PandaDoc, Hubspot, Clay, Clazar, Amazon Web Services.</li>
          </ul>

          <h3>(d) Chat, comments and opinions</h3>
          <p>Information you provide when contacting us directly.</p>
          <ul>
            <li><strong>How we may use it:</strong> To address questions, issues and concerns, and to improve the Service.</li>
            <li><strong>Legal bases:</strong> Legitimate interests (communicating with you, developing and improving our service).</li>
            <li><strong>Recipients:</strong> Hubspot, Tableau, Google Gsuite, Notion, Amazon Web Services, Slack, Clay, front.com, Amazon Bedrock, OpenAI.</li>
          </ul>

          <h3>(e) Information submitted through our AI tool</h3>
          <p>Content of queries (inputs/prompts) and corresponding generated output, database structure metadata.</p>
          <ul>
            <li><strong>How we may use it:</strong> To generate automated responses, assess performance, and improve the Service.</li>
            <li><strong>Legal bases:</strong> Performance of a contract, legitimate interests (developing and improving our service).</li>
            <li><strong>Recipients:</strong> OpenAI, LLC and its affiliates, Amazon Bedrock, Fly.io, AWS.</li>
          </ul>

          <h3>(f) Information received from third parties (e.g., social networks)</h3>
          <p>Name, profile information, and any other information you permit the social network to share.</p>
          <ul>
            <li><strong>How we may use it:</strong> To reshare content, authenticate you and allow access to the Service.</li>
            <li><strong>Legal bases:</strong> Legitimate interests (developing our service and informing marketing strategy), performance of a contract.</li>
            <li><strong>Recipients:</strong> Commonroom, GitHub, Slack.</li>
          </ul>

          <h2 id="2-information-we-collect-about-your-use">2. Information we collect about your Use of the Site and Service</h2>

          <h3>(a) Approximate Location information</h3>
          <p>Derived from WiFi positioning or your IP address.</p>
          <ul>
            <li><strong>How we may use it:</strong> To present the Service on your device, localize features, determine content of interest (with consent).</li>
            <li><strong>Legal bases:</strong> Performance of a contract, legitimate interests, consent.</li>
            <li><strong>Recipients:</strong> Sentry, Tableau, Posthog, Plausible, Google LLC, Fly.io, Vercel, Cloudflare, Configcat, Stape.io, Hex.tech, Amazon Web Services, Customer.io.</li>
          </ul>

          <h3>(b) Information about how you access and use the Service</h3>
          <p>Frequency, time, duration, approximate location, referral sources, pages visited, links clicked, email interactions, multi-device access.</p>
          <ul>
            <li><strong>How we may use it:</strong> To present the Service, monitor and improve the Service, measure advertising effectiveness, deliver personalized ads (with consent).</li>
            <li><strong>Legal bases:</strong> Performance of a contract, consent.</li>
            <li><strong>Recipients:</strong> Posthog, Plausible, Fly.io, Sentry, Hubspot, Google LLC, Vercel, Hex.tech, Amazon Web Services.</li>
          </ul>

          <h3>(c) Log files and information about your device</h3>
          <p>Operating system, browser, applications connected, IP address.</p>
          <ul>
            <li><strong>How we may use it:</strong> To present the Service, detect fraudulent use, maintain security, monitor and improve the Service.</li>
            <li><strong>Legal bases:</strong> Performance of a contract, legitimate interests (security and integrity), consent.</li>
            <li><strong>Recipients:</strong> Posthog, Plausible, Hubspot, Fly.io, Vercel, Sentry, Google LLC, Hex.tech, Amazon Web Services.</li>
          </ul>

          <h2 id="3-how-long-will-we-store-your-personal-information">3. How long will we store your personal information</h2>
          <p>
            We will usually store the personal information we collect about you for no longer than
            necessary for the purposes set out above, in accordance with our legal obligations and
            legitimate business interests.
          </p>
          <p>The criteria used to determine the retention period varies depending on the legal basis:</p>
          <ul>
            <li><strong>Legitimate Interests:</strong> Retained for a reasonable period based on the particular interest.</li>
            <li><strong>Consent:</strong> Retained until you withdraw consent.</li>
            <li><strong>Contract:</strong> Retained for the duration of the contract plus an additional limited period.</li>
            <li><strong>Legal Obligation:</strong> Retained for the period necessary to fulfill the legal obligation.</li>
            <li><strong>Legal Claim:</strong> Retained while a legal hold is in place.</li>
            <li><strong>Contact information:</strong> Retained for as long as you have an account, plus 60 days after closure.</li>
          </ul>

          <h2 id="4-recipients-of-personal-information">4. Recipients of Personal Information</h2>
          <p>
            In addition to the recipients listed above, we may also share your personal information
            with service providers, advisors (legal, accounting), affiliates, purchasers in business
            transactions, and law enforcement or regulators for legal reasons. Each category of
            recipient uses your personal information as described in the full Privacy Disclosures
            section above.
          </p>

          <h2 id="5-marketing-and-advertising">5. Marketing and Advertising</h2>
          <p>
            From time to time we may contact you with information about our services, including
            sending you marketing messages and asking for your feedback on our services. Most
            marketing messages we send will be by email.
          </p>
          <p>
            We rely on your consent for sending marketing communications, using approximate location
            information to determine relevance, and combining personal information from different
            sources to determine relevance. You may give or withdraw any of these consents
            independently.
          </p>

          <h2 id="6-storing-and-transferring-your-personal-information">6. Storing and Transferring your Personal Information</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information against accidental or unlawful destruction, loss, change or damage. All
            personal information we collect will be stored by our cloud hosting provider on secure
            servers.
          </p>
          <p>
            <strong>International Transfers.</strong> The personal information we collect may be transferred
            to and stored in countries outside of the jurisdiction you are in where we and our third
            party service providers have operations, including the United States and Singapore.
            These international transfers are made pursuant to standard contractual clauses approved
            by the European Commission or the UK Information Commissioner.
          </p>

          <h2 id="7-your-rights-in-respect-of-your-personal-information">7. Your rights in respect of your personal information</h2>
          <p>
            In accordance with applicable privacy law, you have the following rights in respect of
            your personal information that we hold:
          </p>
          <ul>
            <li><strong>Right of access.</strong> You have the right to obtain confirmation of whether, and where, we are processing your personal information, information about the categories of personal information we are processing, the purposes for which we process your personal information, and a copy of the personal information we hold about you.</li>
            <li><strong>Right of portability.</strong> You have the right, in certain circumstances, to receive a copy of the personal information you have provided to us in a structured, commonly used, machine-readable format.</li>
            <li><strong>Right to rectification.</strong> You have the right to obtain rectification of any inaccurate or incomplete personal information we hold about you.</li>
            <li><strong>Right to erasure.</strong> You have the right, in some circumstances, to require us to erase your personal information.</li>
            <li><strong>Right to restriction.</strong> You have the right, in some circumstances, to require us to limit the purposes for which we process your personal information.</li>
            <li><strong>Right to withdraw consent.</strong> You have the right to withdraw your consent where we rely on it to process your personal information.</li>
            <li><strong>Right to object.</strong> You have the right to object to our processing of your personal information on grounds relating to your particular situation.</li>
            <li><strong>Right to lodge a complaint.</strong> You have the right to lodge a complaint with a supervisory authority if you believe our processing of your personal information violates applicable law.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the details below. We will
            respond to your request in accordance with applicable law.
          </p>

          <h2 id="8-contact-us-eea-uk-switzerland">8. Contact us</h2>
          <p>
            If you have any questions or concerns regarding this Privacy Notice or our processing of
            your personal information, please contact us at:
          </p>
          <p>
            Email: privacy@supabase.com
          </p>
        </div>
      </main>
    </div>
  );
}
