<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/shashankicdrc/ICDRC">
    <!-- Replace this with your actual organizational logo path if different -->
    <img src="frontend/public/images/logo.png" alt="Logo" width="120" height="auto">
  </a>

  <h3 align="center">ICDRC (Dispute Resolution Center)</h3>

  <p align="center">
    A comprehensive dispute resolution and case management platform for individuals and organizations.
    <br />
    <a href="https://github.com/shashankicdrc/ICDRC"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/shashankicdrc/ICDRC/issues">Report Bug</a>
    ·
    <a href="https://github.com/shashankicdrc/ICDRC/issues">Request Feature</a>
  </p>
</div>

<!-- BADGES -->
<div align="center">
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation--local-development">Installation & Local Development</a></li>
        <li><a href="#manual-setup">Manual Setup</a></li>
      </ul>
    </li>
    <li><a href="#continuous-integration--deployment">Continuous Integration & Deployment</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

ICDRC is a dedicated platform designed to streamline case registrations, tracking, and dispute resolution for both individuals and organizations. It provides dedicated portals for clients and administrators to efficiently handle subscriptions, mediation processes, strict compliance, and secure communication.

### Architecture

This repository is a monorepo consisting of multiple integrated micro-services:

* **`frontend/`**: The client-facing Next.js application where users authenticate, register cases, track statuses, and securely communicate.
* **`dashboard/`**: The Next.js admin portal used to manage users, track application revenue, handle inbound cases, and update dynamic site content.
* **`server/`**: The core Node.js backend providing secure RESTful APIs, powered by Express, MongoDB, Redis, and BullMQ for robust background job processing.
* **`backend/`**: A legacy backend, strictly maintained for reference but inactive in the standard local development environment.

### Built With

The main technologies and frameworks powering the ICDRC platform:

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![MongoDB][MongoDB]][Mongo-url]
* [![Redis][Redis]][Redis-url]
* [![Tailwind][TailwindCSS]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local instance of the application up and running, follow these simple steps.

### Prerequisites

* [Docker](https://www.docker.com/) and Docker Compose
* Node.js (v18 or higher)
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation & Local Development

The most efficient and recommended way to run the entire backend and frontend stack locally is utilizing Docker Compose.

1. **Clone the repository**
   ```sh
   git clone https://github.com/shashankicdrc/ICDRC.git
   cd ICDRC
   ```
2. **Configure Environment Variables**
   Duplicate `.env.example` to `.env` in the following directories and fill in the requisite development values:
   * `/frontend/.env`
   * `/dashboard/.env`
   * `/server/.env`
3. **Start the Development Environment**
   Execute the dev compose file at the root directory:
   ```sh
   docker-compose -f docker-compose.dev.yml up --build
   ```
   
   Once containers are built and initialized, services will be accessible at:
   * **Frontend:** `http://localhost:3000`
   * **Dashboard:** `http://localhost:3001`
   * **API Server:** `http://localhost:7000`
   * **MongoDB:** `localhost:27017`
   * **Redis:** `localhost:6379`

### Manual Setup

If you prefer to run the services explicitly for granular step-through debugging:

1. Ensure your local instances of MongoDB and Redis servers are running.
2. Navigate independently to each directory (`/server`, `/frontend`, `/dashboard`).
3. Run `npm install` within each folder to pull remote dependencies.
4. Execute `npm run dev` in each respective directory to start the local development instances.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CI/CD -->
## Continuous Integration & Deployment

This project utilizes robust GitHub Actions pipelines for automated testing and agile deployments.
- Core CI verification workflows are defined in `.github/workflows/ci.yml`.
- Automated staging and configuration syncing to the pre-production environment are governed by `.github/workflows/deploy-preprod.yml`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] User Authentication (JWT & NextAuth integrations)
- [x] Case Registration workflows
- [x] Realtime Case Tracking alongside Secure File Sharing
- [x] Admin Revenue, Organization Subscriptions, and Diagnostics Dashboards
- [ ] Internal Chat Bot AI Integration 
- [ ] V2 Payment Gateway Implementations (e.g., PhonePe V2)

See the [roadmap.md](./roadmap.md) document at the root level for a full list of historically proposed features and verified deliveries.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would streamline this architecture, please fork the repo and create a pull request. You can also securely open an issue with the tag `enhancement`.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a carefully documented Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

ICDRC Engineering - [support@icdrc.com](mailto:support@icdrc.com)

Project Link: [https://github.com/shashankicdrc/ICDRC](https://github.com/shashankicdrc/ICDRC)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/shashankicdrc/ICDRC.svg?style=for-the-badge
[contributors-url]: https://github.com/shashankicdrc/ICDRC/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shashankicdrc/ICDRC.svg?style=for-the-badge
[forks-url]: https://github.com/shashankicdrc/ICDRC/network/members
[stars-shield]: https://img.shields.io/github/stars/shashankicdrc/ICDRC.svg?style=for-the-badge
[stars-url]: https://github.com/shashankicdrc/ICDRC/stargazers
[issues-shield]: https://img.shields.io/github/issues/shashankicdrc/ICDRC.svg?style=for-the-badge
[issues-url]: https://github.com/shashankicdrc/ICDRC/issues
[license-shield]: https://img.shields.io/github/license/shashankicdrc/ICDRC.svg?style=for-the-badge
[license-url]: https://github.com/shashankicdrc/ICDRC/blob/main/LICENSE
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/
[Redis]: https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
