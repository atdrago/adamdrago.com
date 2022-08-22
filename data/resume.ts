interface ResumeItemParagraph {
  kind: "paragraph";
  content: string;
}

interface ResumeItemSection {
  kind: "section";
  content: {
    heading?: string;
    subheading?: string;
    comment?: string;
    items?: (ResumeItemParagraph | ResumeItemSection | ResumeItemList)[];
  };
}
interface ResumeItemList {
  kind: "list";
  items?: { content: string; style: "normal" | "bold" }[];
}

interface Resume {
  updatedAt: string;
  sections: {
    heading: string;
    items?: (ResumeItemParagraph | ResumeItemSection | ResumeItemList)[];
  }[];
}

const resumeData: Resume = {
  updatedAt: "8/21/22",
  sections: [
    {
      heading: "Profile",
      items: [
        {
          kind: "paragraph",
          content: `
            Front-end engineer with a passion for building beautiful user
            interfaces and exceptional user experiences while adhering to
            established best practices and industry standards. Big fan of
            self-documenting code, functional programming, and "using the
            platform."
          `,
        },
      ],
    },
    {
      heading: "Skills and tools",
      items: [
        {
          kind: "paragraph",
          content: `
            JavaScript, TypeScript, CSS, Semantic and Accessible HTML, REST,
            GraphQL
          `,
        },
        {
          kind: "paragraph",
          content: `
            React, Next.js, React Query, Apollo, and CSS frameworks like
            vanilla-extract, tailwindcss, CSS Modules, Styled Components, and
            SCSS
          `,
        },
        {
          kind: "paragraph",
          content: "Git, GitHub, VSCode",
        },
        {
          kind: "paragraph",
          content: `
            Rollup, Webpack (mostly through Create React App), Gulp, custom
            Node.js build scripts
          `,
        },
      ],
    },
    {
      heading: "Experience",
      items: [
        {
          kind: "section",
          content: {
            heading: "Head of Development / Part Owner, Live Better PHL",
            subheading: "Remote — 6/2022 to Present",
            items: [
              {
                kind: "list",
                items: [
                  {
                    content: `
                      Setup error monitoring and logging on existing food
                      ordering site and restaurant menu management site,
                      unearthing several production issues.
                    `,
                    style: "normal",
                  },
                  {
                    content: "Fix production issues affecting existing sites.",
                    style: "normal",
                  },
                  {
                    content: `
                      Completely rewrite existing food ordering site using
                      Next.js and TypeScript, with static pages for each
                      restaurant.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Learn enough Swift and UIKit to help fix bugs in native
                      iOS app.
                    `,
                    style: "normal",
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "section",
          content: {
            heading: "Staff Engineer, Schedule Engine / HomeX",
            subheading: "Remote — 1/2018 to 11/2021",
            items: [
              {
                kind: "list",
                items: [
                  {
                    content: `
                      Plan out architecture for front-end of Schedule Engine
                      application.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Create script used to embed Schedule Engine scheduling
                      widget, exposing client-side API to client websites.
                      Written in TypeScript, initially built with Webpack,
                      then converted to Rollup.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Create front-end of white-labeled scheduling widget, with
                      several theming options for changing colors, copy, and
                      preferences. Written in TypeScript, built with React and
                      GraphQL, and styled using Styled Components. Eventually
                      used by hundreds of home service providers across the
                      United States and Canada.
                    `,
                    style: "normal",
                  },
                  {
                    content: "Schedule Engine acquired by HomeX around 11/2018",
                    style: "bold",
                  },
                  {
                    content: `
                      Build and maintain shared ESLint config used by front
                      -end projects across the company.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Assist HomeX.com front-end team in adding features and
                      fixing bugs.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Review hundreds of resumes and assist in the hiring
                      of several front-end engineers.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Plan out architecture for new Schedule Engine Enterprise
                      product.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Lead and assist team in creating React component library
                      NPM module, written in TypeScript, built with Rollup.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Lead and assist team in building out two separate
                      dashboards for Schedule Engine Enterprise.
                    `,
                    style: "normal",
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "section",
          content: {
            heading: "Front-end Lead (Contractor), BankMobile",
            subheading: "Remote — 5/2017 to 12/2017",
            items: [
              {
                kind: "list",
                items: [
                  {
                    content: `
                      Work with front-end and back-end teams to fix bugs and add
                      features to existing AngularJS application.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Plan out and implement build system for white-labeled
                      banking web application using Gulp and SCSS.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Lead team and help build out features for new
                      white-labeled application.
                    `,
                    style: "normal",
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "section",
          content: {
            heading: "UI Engineer, Apple, iTunes",
            subheading: "Cupertino, CA — 1/2016 to 5/2017",
            items: [
              {
                kind: "list",
                items: [
                  {
                    content: `
                      Build and maintain JavaScript bridge between Podcasts
                      client and server
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Build and maintain apps for tvOS (What's New, Subscription
                      Management, and others).
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Debug and fix issues with iOS apps (iTunes Store, App
                      Store, Podcasts, iTunes U, iBooks), Desktop iTunes, and
                      iTunes Web Preview.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Work with localization team to create desirable user
                      experiences across all locales.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Work with back-end teams to create APIs that match desired
                      Human Interface team designs.
                    `,
                    style: "normal",
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "section",
          content: {
            heading: "Front-end Web Developer, Apple, Online Store",
            subheading: "Cupertino, CA — 8/2014 to 1/2016",
            items: [
              {
                kind: "list",
                items: [
                  {
                    content: `
                      Develop and maintain marketing content for the Apple
                      Online Store and Apple Store iOS App.
                    `,
                    style: "normal",
                  },
                  {
                    content: `
                      Anticipate and provide solutions for localization and
                      accessibility issues.
                    `,
                    style: "normal",
                  },
                  {
                    content: "Migrate team's Sass build from Compass to Gulp.",
                    style: "normal",
                  },
                  {
                    content: `
                      Write and maintain custom Gulp module to compile Apple
                      Store App style sheets using Sass, greatly improving team
                      performance, and allowing code modularity, shared styles,
                      and a more consistent user experiences.
                    `,
                    style: "normal",
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "section",
          content: {
            comment: "Previous employers excluded for brevity.",
          },
        },
      ],
    },
    {
      heading: "Education",
      items: [
        {
          kind: "paragraph",
          content:
            "Millersville University, Millersville, PA — B.S., Computer Science, 2010",
        },
      ],
    },
  ],
};

export default resumeData;
