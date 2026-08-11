# Multi-Container Todo Service

A Dockerized Node.js/Express/MongoDB Todo API with a full CI/CD pipeline: containerized locally, deployed via managed hosting, with infrastructure automation demonstrated via Vagrant + Ansible.

**Live API:** https://todo-api-8s86.onrender.com/todos

## Architecture

- **API**: Node.js + Express + Mongoose
- **Database**: MongoDB (Atlas in production, containerized locally for dev)
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions builds and pushes the Docker image to Docker Hub on every push to `main`, then triggers a deploy on Render via a deploy hook
- **Hosting**: Render (pulls the image from Docker Hub)
- **Infrastructure automation**: Vagrant + Ansible playbook (see `/infra`) provisions a VM and installs Docker, clones the app, and starts it via `docker compose` — demonstrating the same automation pattern used for real cloud servers

### Note on infrastructure choices

This project follows the [roadmap.sh Multi-Container Service](https://roadmap.sh/projects/multi-container-service) spec, which calls for Terraform + Ansible provisioning a real cloud server. Cloud providers require a credit card for free-tier signup, so infrastructure provisioning was demonstrated locally instead: Vagrant creates a VM (standing in for Terraform's cloud server), and the same Ansible playbook installs Docker and deploys the app to it — identical mechanics to a real cloud deployment, just targeting a local VM instead of a cloud IP.

For actual live hosting, the deployed image runs on Render (free tier) with MongoDB Atlas (free tier) as the database — both free without requiring payment info.

## Running locally

```bash
git clone https://github.com/JeremyBarrera/Multi-Container-Application.git
cd Multi-Container-Application
cp .env.example .env
docker compose up
```

API available at `http://localhost:3000/todos`

## API Endpoints

| Method | Endpoint      | Description       |
|--------|---------------|--------------------|
| GET    | /todos        | List all todos     |
| GET    | /todos/:id    | Get one todo       |
| POST   | /todos        | Create a todo       |
| PUT    | /todos/:id    | Update a todo       |
| DELETE | /todos/:id    | Delete a todo       |

## Infrastructure automation (local demo)

```bash
cd infra
vagrant up                                # provisions local VM
ansible-playbook -i inventory.ini playbook.yml   # installs Docker, deploys app
```

## CI/CD Pipeline

On push to `main`:
1. GitHub Actions builds the Docker image
2. Pushes it to Docker Hub
3. Triggers a Render deploy hook, which pulls the new image and restarts the live service
