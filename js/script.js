/* ===================================
   DEVOPS UTILITY HUB - COMPLETE JS
   Built by Hitesh
   =================================== */

// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1800);
});

// ===== PARTICLES BACKGROUND =====
(function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(108, 92, 231, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        animId = requestAnimationFrame(animate);
    }
    animate();
})();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);

    // Active nav link based on scroll
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
}

// ===== SCROLL TO TOP =====
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HERO TYPING EFFECT =====
const commands = [
    'docker build -t devops-hub .',
    'kubectl apply -f deployment.yaml',
    'terraform plan -out=tfplan',
    'ansible-playbook deploy.yml',
    'helm install myapp ./chart',
    'aws s3 sync . s3://my-bucket',
    'npm run build && npm start',
    'git push origin main --force',
];

let cmdIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeCommand() {
    const current = commands[cmdIndex];
    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            cmdIndex = (cmdIndex + 1) % commands.length;
            setTimeout(typeCommand, 500);
            return;
        }
        setTimeout(typeCommand, 30);
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeCommand, 2000);
            return;
        }
        setTimeout(typeCommand, 60);
    }
}
typeCommand();

// ===== STAT COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = { threshold: 0.5 };

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'));
            animateCounter(el, target);
            statObserver.unobserve(el);
        }
    });
}, observerOptions);

statNumbers.forEach(el => statObserver.observe(el));

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 30);
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    toastMsg.textContent = message;
    toast.className = 'toast show' + (type === 'error' ? ' error' : '');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ===== COPY TO CLIPBOARD =====
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const clipboardText = btn.getAttribute('data-clipboard');

        let text = '';
        if (clipboardText) {
            text = clipboardText;
        } else if (targetId) {
            const el = document.getElementById(targetId);
            text = el ? el.value || el.textContent : '';
        }

        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copied to clipboard!');
            }).catch(() => {
                showToast('Failed to copy', 'error');
            });
        }
    });
});

// ===== LINE NUMBERS FOR YAML =====
const yamlInput = document.getElementById('yamlInput');
const yamlLineNumbers = document.getElementById('yamlLineNumbers');

function updateLineNumbers() {
    const lines = yamlInput.value.split('\n').length;
    yamlLineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}
yamlInput.addEventListener('input', updateLineNumbers);
yamlInput.addEventListener('scroll', () => {
    yamlLineNumbers.scrollTop = yamlInput.scrollTop;
});

// ===== YAML VALIDATOR =====
document.getElementById('yamlSample').addEventListener('click', () => {
    yamlInput.value = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.21
          ports:
            - containerPort: 80
          resources:
            limits:
              memory: "128Mi"
              cpu: "500m"
            requests:
              memory: "64Mi"
              cpu: "250m"`;
    updateLineNumbers();
});

document.getElementById('yamlClear').addEventListener('click', () => {
    yamlInput.value = '';
    document.getElementById('yamlOutput').value = '';
    document.getElementById('yamlOutput').classList.add('hidden');
    document.getElementById('yamlResult').innerHTML = '<div class="result-placeholder"><i class="fas fa-arrow-left"></i><p>Enter YAML and click Validate</p></div>';
    document.getElementById('yamlResult').style.display = '';
    updateLineNumbers();
});

document.getElementById('yamlValidate').addEventListener('click', () => {
    const input = yamlInput.value.trim();
    const resultDiv = document.getElementById('yamlResult');
    const outputArea = document.getElementById('yamlOutput');

    if (!input) {
        resultDiv.style.display = '';
        outputArea.classList.add('hidden');
        resultDiv.innerHTML = '<div class="yaml-error"><div class="error-title"><i class="fas fa-exclamation-triangle"></i> No Input</div><div class="error-detail">Please paste some YAML content first.</div></div>';
        return;
    }

    try {
        const parsed = jsyaml.load(input);
        const formatted = jsyaml.dump(parsed, { indent: 2, lineWidth: 120, noRefs: true });

        const activeTab = document.querySelector('.ws-tab.active').getAttribute('data-tab');

        let output = formatted;
        if (activeTab === 'minify') {
            output = JSON.stringify(parsed);
        }

        // Show info
        const lineCount = input.split('\n').length;
        const charCount = input.length;
        const type = Array.isArray(parsed) ? 'Array' : typeof parsed;
        const keys = parsed && typeof parsed === 'object' ? Object.keys(parsed).length : 0;

        resultDiv.style.display = '';
        outputArea.classList.add('hidden');
        resultDiv.innerHTML = `
            <div class="yaml-valid"><i class="fas fa-check-circle"></i> Valid YAML!</div>
            <div class="yaml-info">
                <div class="yaml-info-item"><div class="label">Lines</div><div class="value">${lineCount}</div></div>
                <div class="yaml-info-item"><div class="label">Characters</div><div class="value">${charCount}</div></div>
                <div class="yaml-info-item"><div class="label">Type</div><div class="value">${type}</div></div>
                <div class="yaml-info-item"><div class="label">Top Keys</div><div class="value">${keys}</div></div>
            </div>
        `;

        if (activeTab !== 'validate') {
            resultDiv.style.display = 'none';
            outputArea.classList.remove('hidden');
            outputArea.value = output;
        }

    } catch (e) {
        resultDiv.style.display = '';
        outputArea.classList.add('hidden');
        resultDiv.innerHTML = `
            <div class="yaml-error">
                <div class="error-title"><i class="fas fa-times-circle"></i> Invalid YAML</div>
                <div class="error-detail">${e.message}</div>
            </div>
        `;
    }
});

// YAML tabs
document.querySelectorAll('.ws-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.ws-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// ===== LINE NUMBERS FOR JSON =====
const jsonInput = document.getElementById('jsonInput');
const jsonLineNumbers = document.getElementById('jsonLineNumbers');

function updateJsonLineNumbers() {
    if(!jsonInput || !jsonLineNumbers) return;
    const lines = jsonInput.value.split('\n').length;
    jsonLineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}
if(jsonInput) {
    jsonInput.addEventListener('input', updateJsonLineNumbers);
    jsonInput.addEventListener('scroll', () => {
        if(jsonLineNumbers) jsonLineNumbers.scrollTop = jsonInput.scrollTop;
    });
}

// ===== JSON VALIDATOR =====
document.getElementById('jsonSample')?.addEventListener('click', () => {
    if(!jsonInput) return;
    jsonInput.value = `{
  "projectName": "DevOps Utility Hub",
  "version": "1.0.0",
  "features": [
    "YAML Validator",
    "JSON Validator",
    "Docker Generator"
  ],
  "author": {
    "name": "Hitesh",
    "role": "DevOps Engineer"
  },
  "isClientSide": true,
  "dependencies": null
}`;
    updateJsonLineNumbers();
});

document.getElementById('jsonClear')?.addEventListener('click', () => {
    if(!jsonInput) return;
    jsonInput.value = '';
    const outputArea = document.getElementById('jsonOutput');
    const resultDiv = document.getElementById('jsonResult');
    if(outputArea) {
        outputArea.value = '';
        outputArea.classList.add('hidden');
    }
    if(resultDiv) {
        resultDiv.innerHTML = '<div class="result-placeholder"><i class="fas fa-arrow-left"></i><p>Enter JSON and click Validate</p></div>';
        resultDiv.style.display = '';
    }
    updateJsonLineNumbers();
});

document.getElementById('jsonValidate')?.addEventListener('click', () => {
    if(!jsonInput) return;
    const input = jsonInput.value.trim();
    const resultDiv = document.getElementById('jsonResult');
    const outputArea = document.getElementById('jsonOutput');

    if (!input) {
        if(resultDiv) {
            resultDiv.style.display = '';
            resultDiv.innerHTML = '<div class="yaml-error"><div class="error-title"><i class="fas fa-exclamation-triangle"></i> No Input</div><div class="error-detail">Please paste some JSON content first.</div></div>';
        }
        if(outputArea) outputArea.classList.add('hidden');
        return;
    }

    try {
        const parsed = JSON.parse(input);
        const activeTabEl = document.querySelector('.ws-tab-json.active');
        const activeTab = activeTabEl ? activeTabEl.getAttribute('data-tab') : 'validate';

        let output = '';
        if (activeTab === 'minify') {
            output = JSON.stringify(parsed);
        } else {
            output = JSON.stringify(parsed, null, 2);
        }

        const lineCount = input.split('\n').length;
        const charCount = input.length;
        const type = Array.isArray(parsed) ? 'Array' : (parsed === null ? 'Null' : typeof parsed);
        const keys = parsed && typeof parsed === 'object' ? Object.keys(parsed).length : 0;

        if(resultDiv) {
            resultDiv.style.display = '';
            resultDiv.innerHTML = `
                <div class="yaml-valid"><i class="fas fa-check-circle"></i> Valid JSON!</div>
                <div class="yaml-info">
                    <div class="yaml-info-item"><div class="label">Lines</div><div class="value">${lineCount}</div></div>
                    <div class="yaml-info-item"><div class="label">Characters</div><div class="value">${charCount}</div></div>
                    <div class="yaml-info-item"><div class="label">Type</div><div class="value">${type}</div></div>
                    <div class="yaml-info-item"><div class="label">Top Keys</div><div class="value">${keys}</div></div>
                </div>
            `;
        }
        
        if (activeTab !== 'validate') {
            if(resultDiv) resultDiv.style.display = 'none';
            if(outputArea) {
                outputArea.classList.remove('hidden');
                outputArea.value = output;
            }
        } else {
            if(outputArea) outputArea.classList.add('hidden');
        }

    } catch (e) {
        if(resultDiv) {
            resultDiv.style.display = '';
            resultDiv.innerHTML = `
                <div class="yaml-error">
                    <div class="error-title"><i class="fas fa-times-circle"></i> Invalid JSON</div>
                    <div class="error-detail">${e.message}</div>
                </div>
            `;
        }
        if(outputArea) outputArea.classList.add('hidden');
    }
});

// JSON tabs
document.querySelectorAll('.ws-tab-json').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.ws-tab-json').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// ===== YAML ↔ JSON CONVERTER =====
document.getElementById('yamlToJson').addEventListener('click', () => {
    const yamlText = document.getElementById('converterYaml').value.trim();
    if (!yamlText) { showToast('Please enter YAML first', 'error'); return; }
    try {
        const parsed = jsyaml.load(yamlText);
        document.getElementById('converterJson').value = JSON.stringify(parsed, null, 2);
        showToast('YAML → JSON converted!');
    } catch (e) {
        showToast('Invalid YAML: ' + e.message, 'error');
    }
});

document.getElementById('jsonToYaml').addEventListener('click', () => {
    const jsonText = document.getElementById('converterJson').value.trim();
    if (!jsonText) { showToast('Please enter JSON first', 'error'); return; }
    try {
        const parsed = JSON.parse(jsonText);
        document.getElementById('converterYaml').value = jsyaml.dump(parsed, { indent: 2 });
        showToast('JSON → YAML converted!');
    } catch (e) {
        showToast('Invalid JSON: ' + e.message, 'error');
    }
});

document.getElementById('converterClear').addEventListener('click', () => {
    document.getElementById('converterYaml').value = '';
    document.getElementById('converterJson').value = '';
});

// ===== DOCKERFILE GENERATOR =====
const dockerfileTemplates = {
    node: (v, port, workdir, multi, nonroot, health) => {
        if (multi) {
            return `# Stage 1: Build
FROM node:${v || '18-alpine'} AS builder
WORKDIR ${workdir}
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Stage 2: Production
FROM node:${v || '18-alpine'}
WORKDIR ${workdir}
${nonroot ? `
# Create non-root user
RUN addgroup -g 1001 appgroup && \\
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser
` : ''}
COPY --from=builder ${workdir} .
${nonroot ? 'USER appuser' : ''}
EXPOSE ${port}
${health ? `
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
    CMD wget --no-verbose --tries=1 --spider http://localhost:${port}/health || exit 1
` : ''}
CMD ["node", "index.js"]`;
        }
        return `FROM node:${v || '18-alpine'}
WORKDIR ${workdir}
COPY package*.json ./
RUN npm ci --only=production
COPY . .
${nonroot ? 'RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -s /bin/sh -D appuser\nUSER appuser' : ''}
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD wget --spider http://localhost:${port}/health || exit 1` : ''}
CMD ["node", "index.js"]`;
    },
    python: (v, port, workdir, multi, nonroot, health) => {
        return `FROM python:${v || '3.11-slim'}
WORKDIR ${workdir}

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
${nonroot ? '\nRUN useradd -m -r appuser\nUSER appuser' : ''}
EXPOSE ${port}
${health ? `\nHEALTHCHECK --interval=30s --timeout=3s \\
    CMD curl -f http://localhost:${port}/health || exit 1` : ''}
CMD ["python", "app.py"]`;
    },
    java: (v, port, workdir, multi, nonroot, health) => {
        return `# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR ${workdir}
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Production
FROM eclipse-temurin:17-jre-${v || 'alpine'}
WORKDIR ${workdir}
COPY --from=builder ${workdir}/target/*.jar app.jar
${nonroot ? 'RUN addgroup --system app && adduser --system --ingroup app app\nUSER app' : ''}
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:${port}/actuator/health || exit 1` : ''}
ENTRYPOINT ["java", "-jar", "app.jar"]`;
    },
    go: (v, port, workdir, multi, nonroot, health) => {
        return `# Stage 1: Build
FROM golang:${v || '1.21-alpine'} AS builder
WORKDIR ${workdir}
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Stage 2: Production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder ${workdir}/main .
${nonroot ? 'RUN adduser -D appuser\nUSER appuser' : ''}
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:${port}/health || exit 1` : ''}
CMD ["./main"]`;
    },
    react: (v, port, workdir, multi, nonroot, health) => {
        return `# Stage 1: Build
FROM node:${v || '18-alpine'} AS builder
WORKDIR ${workdir}
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder ${workdir}/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:${port}/ || exit 1` : ''}
CMD ["nginx", "-g", "daemon off;"]`;
    },
    nginx: (v, port, workdir, multi, nonroot, health) => {
        return `FROM nginx:${v || 'alpine'}
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:${port}/ || exit 1` : ''}
CMD ["nginx", "-g", "daemon off;"]`;
    },
    php: (v, port, workdir, multi, nonroot, health) => {
        return `FROM php:${v || '8.2-apache'}
WORKDIR /var/www/html
RUN docker-php-ext-install pdo pdo_mysql mysqli
COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:${port}/ || exit 1` : ''}
CMD ["apache2-foreground"]`;
    },
    ruby: (v, port, workdir, multi, nonroot, health) => {
        return `FROM ruby:${v || '3.2-alpine'}
WORKDIR ${workdir}
RUN apk add --no-cache build-base
COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test
COPY . .
${nonroot ? 'RUN adduser -D appuser\nUSER appuser' : ''}
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:${port}/health || exit 1` : ''}
CMD ["rails", "server", "-b", "0.0.0.0"]`;
    },
    dotnet: (v, port, workdir, multi, nonroot, health) => {
        return `# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:${v || '7.0'} AS builder
WORKDIR ${workdir}
COPY *.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out

# Stage 2: Production
FROM mcr.microsoft.com/dotnet/aspnet:${v || '7.0'}
WORKDIR ${workdir}
COPY --from=builder ${workdir}/out .
${nonroot ? 'USER 1001' : ''}
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:${port}/health || exit 1` : ''}
ENTRYPOINT ["dotnet", "app.dll"]`;
    },
    rust: (v, port, workdir, multi, nonroot, health) => {
        return `# Stage 1: Build
FROM rust:${v || '1.73-alpine'} AS builder
RUN apk add --no-cache musl-dev
WORKDIR ${workdir}
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

# Stage 2: Production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder ${workdir}/target/release/app /usr/local/bin/
${nonroot ? 'RUN adduser -D appuser\nUSER appuser' : ''}
EXPOSE ${port}
${health ? `HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:${port}/health || exit 1` : ''}
CMD ["app"]`;
    }
};

document.getElementById('generateDockerfile').addEventListener('click', () => {
    const tech = document.getElementById('dockerTech').value;
    const version = document.getElementById('dockerVersion').value;
    const port = document.getElementById('dockerPort').value || '3000';
    const workdir = document.getElementById('dockerWorkdir').value || '/app';
    const multi = document.getElementById('dockerMultistage').checked;
    const nonroot = document.getElementById('dockerNonroot').checked;
    const health = document.getElementById('dockerHealthcheck').checked;

    const template = dockerfileTemplates[tech];
    if (template) {
        const result = template(version, port, workdir, multi, nonroot, health);
        document.getElementById('dockerfileOutput').value = result;
        showToast('Dockerfile generated!');
    }
});

document.getElementById('downloadDockerfile').addEventListener('click', () => {
    downloadFile('Dockerfile', document.getElementById('dockerfileOutput').value);
});

// ===== DOCKER COMPOSE GENERATOR =====
let serviceCount = 1;

document.getElementById('addService').addEventListener('click', () => {
    addServiceCard('', '', '', '', '', '', true);
});

document.getElementById('addPresetDb').addEventListener('click', () => {
    addServiceCard('mysql', 'mysql:8.0', '3306:3306', 'MYSQL_ROOT_PASSWORD=rootpass,MYSQL_DATABASE=mydb', 'mysql_data:/var/lib/mysql', '', true);
});

document.getElementById('addPresetRedis').addEventListener('click', () => {
    addServiceCard('redis', 'redis:7-alpine', '6379:6379', '', 'redis_data:/data', '', true);
});

document.getElementById('addPresetMongo').addEventListener('click', () => {
    addServiceCard('mongo', 'mongo:6', '27017:27017', 'MONGO_INITDB_ROOT_USERNAME=root,MONGO_INITDB_ROOT_PASSWORD=rootpass', 'mongo_data:/data/db', '', true);
});

function addServiceCard(name, image, ports, env, volumes, depends, restart) {
    serviceCount++;
    const container = document.getElementById('composeServices');
    const card = document.createElement('div');
    card.className = 'service-card';
    card.setAttribute('data-service', serviceCount);
    card.innerHTML = `
        <div class="service-header">
            <h4><i class="fas fa-cube"></i> ${name || 'Service ' + serviceCount}</h4>
            <button class="remove-service" title="Remove"><i class="fas fa-times"></i></button>
        </div>
        <div class="service-body">
            <div class="form-group"><label>Service Name</label><input type="text" class="svc-name" value="${name}"></div>
            <div class="form-group"><label>Image</label><input type="text" class="svc-image" value="${image}"></div>
            <div class="form-group"><label>Ports</label><input type="text" class="svc-ports" value="${ports}"></div>
            <div class="form-group"><label>Environment</label><input type="text" class="svc-env" value="${env}"></div>
            <div class="form-group"><label>Volumes</label><input type="text" class="svc-volumes" value="${volumes}"></div>
            <div class="form-group"><label>Depends On</label><input type="text" class="svc-depends" value="${depends}"></div>
            <div class="form-check"><input type="checkbox" class="svc-restart" ${restart ? 'checked' : ''}><label>Restart Always</label></div>
        </div>
    `;
    container.appendChild(card);

    card.querySelector('.remove-service').addEventListener('click', () => {
        card.remove();
    });
}

// Remove first service card handler
document.querySelector('.remove-service').addEventListener('click', function () {
    if (document.querySelectorAll('.service-card').length > 1) {
        this.closest('.service-card').remove();
    } else {
        showToast('Need at least 1 service', 'error');
    }
});

document.getElementById('generateCompose').addEventListener('click', () => {
    const cards = document.querySelectorAll('.service-card');
    let compose = 'version: "3.8"\n\nservices:\n';
    let volumes = [];

    cards.forEach(card => {
        const name = card.querySelector('.svc-name').value || 'service';
        const image = card.querySelector('.svc-image').value || 'nginx:latest';
        const ports = card.querySelector('.svc-ports').value;
        const env = card.querySelector('.svc-env').value;
        const vols = card.querySelector('.svc-volumes').value;
        const depends = card.querySelector('.svc-depends').value;
        const restart = card.querySelector('.svc-restart').checked;

        compose += `  ${name}:\n`;
        compose += `    image: ${image}\n`;
        compose += `    container_name: ${name}\n`;

        if (ports) {
            compose += `    ports:\n`;
            ports.split(',').forEach(p => {
                compose += `      - "${p.trim()}"\n`;
            });
        }

        if (env) {
            compose += `    environment:\n`;
            env.split(',').forEach(e => {
                const [key, val] = e.trim().split('=');
                compose += `      ${key}: "${val || ''}"\n`;
            });
        }

        if (vols) {
            compose += `    volumes:\n`;
            vols.split(',').forEach(v => {
                compose += `      - ${v.trim()}\n`;
                const volName = v.trim().split(':')[0];
                if (!volName.startsWith('.') && !volName.startsWith('/')) {
                    volumes.push(volName);
                }
            });
        }

        if (depends) {
            compose += `    depends_on:\n`;
            depends.split(',').forEach(d => {
                compose += `      - ${d.trim()}\n`;
            });
        }

        if (restart) {
            compose += `    restart: always\n`;
        }

        compose += `    networks:\n      - app-network\n\n`;
    });

    compose += `networks:\n  app-network:\n    driver: bridge\n`;

    if (volumes.length > 0) {
        compose += `\nvolumes:\n`;
        [...new Set(volumes)].forEach(v => {
            compose += `  ${v}:\n    driver: local\n`;
        });
    }

    document.getElementById('composeOutput').value = compose;
    showToast('Docker Compose generated!');
});

document.getElementById('downloadCompose').addEventListener('click', () => {
    downloadFile('docker-compose.yml', document.getElementById('composeOutput').value);
});

// ===== BASE64 ENCODER/DECODER =====
document.getElementById('base64Encode').addEventListener('click', () => {
    const input = document.getElementById('base64Input').value;
    if (!input) { showToast('Enter text first', 'error'); return; }
    document.getElementById('base64Output').value = btoa(unescape(encodeURIComponent(input)));
    showToast('Encoded!');
});

document.getElementById('base64Decode').addEventListener('click', () => {
    const input = document.getElementById('base64Output').value || document.getElementById('base64Input').value;
    if (!input) { showToast('Enter Base64 first', 'error'); return; }
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('base64Input').value = decoded;
        showToast('Decoded!');
    } catch (e) {
        showToast('Invalid Base64 string', 'error');
    }
});

document.getElementById('base64K8s').addEventListener('click', () => {
    const input = document.getElementById('base64Input').value;
    if (!input) { showToast('Enter key=value pairs', 'error'); return; }

    let secret = `apiVersion: v1\nkind: Secret\nmetadata:\n  name: my-secret\ntype: Opaque\ndata:\n`;
    input.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && trimmed.includes('=')) {
            const [key, ...valParts] = trimmed.split('=');
            const val = valParts.join('=');
            secret += `  ${key.trim()}: ${btoa(val.trim())}\n`;
        }
    });

    document.getElementById('base64Output').value = secret;
    showToast('K8s Secret generated!');
});

// ===== PASSWORD GENERATOR =====
const pwdLength = document.getElementById('pwdLength');
const pwdLengthValue = document.getElementById('pwdLengthValue');
pwdLength.addEventListener('input', () => {
    pwdLengthValue.textContent = pwdLength.value;
});

document.querySelectorAll('.preset-btn[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        const output = document.getElementById('passwordOutput');

        switch (preset) {
            case 'api':
                output.innerHTML = generatePasswordItems([generateAPIKey()]);
                break;
            case 'db':
                pwdLength.value = 32;
                pwdLengthValue.textContent = 32;
                break;
            case 'jwt':
                output.innerHTML = generatePasswordItems([generateRandomString(64)]);
                break;
            case 'k8s':
                output.innerHTML = generatePasswordItems([btoa(generateRandomString(32))]);
                break;
            case 'uuid':
                output.innerHTML = generatePasswordItems([generateUUID()]);
                break;
        }
    });
});

document.getElementById('generatePasswords').addEventListener('click', () => {
    const length = parseInt(pwdLength.value);
    const count = parseInt(document.getElementById('pwdCount').value);
    const upper = document.getElementById('pwdUpper').checked;
    const lower = document.getElementById('pwdLower').checked;
    const numbers = document.getElementById('pwdNumbers').checked;
    const symbols = document.getElementById('pwdSymbols').checked;

    let charset = '';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
        showToast('Select at least one character type', 'error');
        return;
    }

    const passwords = [];
    for (let i = 0; i < count; i++) {
        let pwd = '';
        for (let j = 0; j < length; j++) {
            pwd += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        passwords.push(pwd);
    }

    document.getElementById('passwordOutput').innerHTML = generatePasswordItems(passwords);
    showToast(`${count} password(s) generated!`);
});

function generatePasswordItems(passwords) {
    return passwords.map(pwd => {
        const strength = getPasswordStrength(pwd);
        return `
            <div class="password-item">
                <span class="pwd-text">${pwd}</span>
                <button class="pwd-copy" onclick="navigator.clipboard.writeText('${pwd}');showToast('Copied!')">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
            <div class="password-strength"><div class="strength-bar" style="width:${strength.percent}%;background:${strength.color}"></div></div>
        `;
    }).join('');
}

function getPasswordStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 16) score++;
    if (pwd.length >= 24) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    const percent = Math.min((score / 7) * 100, 100);
    let color = '#ff6b6b';
    if (percent > 70) color = '#00b894';
    else if (percent > 40) color = '#fdcb6e';

    return { percent, color };
}

function generateAPIKey() {
    return 'ak_' + generateRandomString(32);
}

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// ===== GITIGNORE GENERATOR =====
const gitignoreTemplates = {
    node: `# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.npm
.yarn-integrity
dist/
build/
coverage/
.nyc_output/`,
    python: `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/
pip-log.txt
pip-delete-this-directory.txt
*.egg-info/
dist/
build/
.eggs/
*.egg
.pytest_cache/
.mypy_cache/`,
    java: `# Java
*.class
*.jar
*.war
*.ear
target/
.gradle/
build/
out/
.idea/
*.iml`,
    react: `# React
node_modules/
build/
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*`,
    go: `# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
vendor/
go.sum`,
    docker: `# Docker
.dockerignore
docker-compose.override.yml
.docker/`,
    terraform: `# Terraform
.terraform/
*.tfstate
*.tfstate.*
crash.log
*.tfvars
override.tf
override.tf.json
*_override.tf
*_override.tf.json
.terraformrc
terraform.rc`,
    vscode: `# VS Code
.vscode/
*.code-workspace
.history/`,
    macos: `# macOS
.DS_Store
.AppleDouble
.LSOverride
._*
.Spotlight-V100
.Trashes`,
    windows: `# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
*.lnk`,
    linux: `# Linux
*~
.fuse_hidden*
.directory
.Trash-*
.nfs*`,
    env: `# Environment
.env
.env.local
.env.*.local
.env.development
.env.production
.env.staging`,
    rust: `# Rust
target/
Cargo.lock
**/*.rs.bk`,
    php: `# PHP
vendor/
composer.lock
*.cache
*.log
.phpunit.result.cache`,
    ruby: `# Ruby
*.gem
*.rbc
.bundle/
vendor/bundle
log/
tmp/
.env`,
    jetbrains: `# JetBrains IDEs
.idea/
*.iml
*.iws
*.ipr
out/
.idea_modules/`
};

document.getElementById('generateGitignore').addEventListener('click', () => {
    const selected = [];
    document.querySelectorAll('#techGrid input:checked').forEach(cb => {
        selected.push(cb.value);
    });

    if (selected.length === 0) {
        showToast('Select at least one technology', 'error');
        return;
    }

    let output = `# ============================================\n# .gitignore - Generated by DevOps Utility Hub\n# ============================================\n\n`;

    selected.forEach(tech => {
        if (gitignoreTemplates[tech]) {
            output += gitignoreTemplates[tech] + '\n\n';
        }
    });

    output += `# ============================================\n# Generated on: ${new Date().toLocaleDateString()}\n# ============================================`;

    document.getElementById('gitignoreOutput').value = output;
    showToast('.gitignore generated!');
});

document.getElementById('downloadGitignore').addEventListener('click', () => {
    downloadFile('.gitignore', document.getElementById('gitignoreOutput').value);
});

// ===== NGINX CONFIG GENERATOR =====
const nginxType = document.getElementById('nginxType');
nginxType.addEventListener('change', () => {
    const val = nginxType.value;
    document.getElementById('nginxUpstreamGroup').style.display =
        (val === 'reverse-proxy' || val === 'load-balancer') ? '' : 'none';
    document.getElementById('nginxRootGroup').style.display =
        (val === 'static' || val === 'spa' || val === 'php') ? '' : 'none';
});

document.getElementById('generateNginx').addEventListener('click', () => {
    const type = nginxType.value;
    const domain = document.getElementById('nginxDomain').value || 'example.com';
    const port = document.getElementById('nginxPort').value || '80';
    const upstream = document.getElementById('nginxUpstream').value || 'localhost:3000';
    const root = document.getElementById('nginxRoot').value || '/var/www/html';
    const ssl = document.getElementById('nginxSSL').checked;
    const gzip = document.getElementById('nginxGzip').checked;
    const logs = document.getElementById('nginxLogs').checked;

    let config = '';

    // Gzip
    const gzipBlock = gzip ? `
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
` : '';

    // SSL
    const sslBlock = ssl ? `
    listen 443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
` : `    listen ${port};`;

    // SSL redirect
    const sslRedirect = ssl ? `
server {
    listen 80;
    server_name ${domain};
    return 301 https://$host$request_uri;
}
` : '';

    // Logs
    const logBlock = logs ? `
    access_log /var/log/nginx/${domain}.access.log;
    error_log /var/log/nginx/${domain}.error.log;
` : '';

    switch (type) {
        case 'reverse-proxy':
            config = `${sslRedirect}
server {
${sslBlock}
    server_name ${domain};
${logBlock}
${gzipBlock}
    location / {
        proxy_pass http://${upstream};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}`;
            break;

        case 'static':
            config = `${sslRedirect}
server {
${sslBlock}
    server_name ${domain};
    root ${root};
    index index.html index.htm;
${logBlock}
${gzipBlock}
    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}`;
            break;

        case 'spa':
            config = `${sslRedirect}
server {
${sslBlock}
    server_name ${domain};
    root ${root};
    index index.html;
${logBlock}
${gzipBlock}
    # SPA: All routes to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Don't cache index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}`;
            break;

        case 'load-balancer':
            config = `upstream backend {
    least_conn;
    server ${upstream};
    server localhost:3001;
    server localhost:3002;
}

${sslRedirect}
server {
${sslBlock}
    server_name ${domain};
${logBlock}
${gzipBlock}
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}`;
            break;

        case 'php':
            config = `${sslRedirect}
server {
${sslBlock}
    server_name ${domain};
    root ${root};
    index index.php index.html;
${logBlock}
${gzipBlock}
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\\.ht {
        deny all;
    }
}`;
            break;
    }

    document.getElementById('nginxOutput').value = config;
    showToast('Nginx config generated!');
});

document.getElementById('downloadNginx').addEventListener('click', () => {
    downloadFile('nginx.conf', document.getElementById('nginxOutput').value);
});

// ===== SUBNET CALCULATOR =====
document.getElementById('subnetCIDR').addEventListener('input', () => {
    document.getElementById('cidrValue').textContent = '/' + document.getElementById('subnetCIDR').value;
});

document.getElementById('calculateSubnet').addEventListener('click', () => {
    const ip = document.getElementById('subnetIP').value;
    const cidr = parseInt(document.getElementById('subnetCIDR').value);

    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        showToast('Invalid IP address', 'error');
        return;
    }

    const ipBinary = parts.map(p => p.toString(2).padStart(8, '0')).join('');
    const maskBinary = '1'.repeat(cidr) + '0'.repeat(32 - cidr);

    const networkBinary = ipBinary.split('').map((b, i) => b & maskBinary[i]).join('');
    const broadcastBinary = networkBinary.substring(0, cidr) + '1'.repeat(32 - cidr);

    const network = binaryToIP(networkBinary);
    const broadcast = binaryToIP(broadcastBinary);
    const mask = binaryToIP(maskBinary);
    const wildcard = binaryToIP(maskBinary.split('').map(b => b === '1' ? '0' : '1').join(''));

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? totalHosts : totalHosts - 2;

    const firstHost = cidr >= 31 ? network : incrementIP(network);
    const lastHost = cidr >= 31 ? broadcast : decrementIP(broadcast);

    // Determine class
    let ipClass = 'N/A';
    if (parts[0] <= 127) ipClass = 'A';
    else if (parts[0] <= 191) ipClass = 'B';
    else if (parts[0] <= 223) ipClass = 'C';
    else if (parts[0] <= 239) ipClass = 'D (Multicast)';
    else ipClass = 'E (Reserved)';

    const isPrivate = (parts[0] === 10) ||
        (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
        (parts[0] === 192 && parts[1] === 168);

    document.getElementById('subnetResults').innerHTML = `
        <div class="subnet-grid">
            <div class="subnet-item"><div class="subnet-label">Network Address</div><div class="subnet-value">${network}/${cidr}</div></div>
            <div class="subnet-item"><div class="subnet-label">Broadcast Address</div><div class="subnet-value">${broadcast}</div></div>
            <div class="subnet-item"><div class="subnet-label">Subnet Mask</div><div class="subnet-value">${mask}</div></div>
            <div class="subnet-item"><div class="subnet-label">Wildcard Mask</div><div class="subnet-value">${wildcard}</div></div>
            <div class="subnet-item"><div class="subnet-label">First Usable Host</div><div class="subnet-value">${firstHost}</div></div>
            <div class="subnet-item"><div class="subnet-label">Last Usable Host</div><div class="subnet-value">${lastHost}</div></div>
            <div class="subnet-item"><div class="subnet-label">Total Hosts</div><div class="subnet-value">${totalHosts.toLocaleString()}</div></div>
            <div class="subnet-item"><div class="subnet-label">Usable Hosts</div><div class="subnet-value">${usableHosts.toLocaleString()}</div></div>
            <div class="subnet-item"><div class="subnet-label">IP Class</div><div class="subnet-value">${ipClass}</div></div>
            <div class="subnet-item"><div class="subnet-label">Type</div><div class="subnet-value">${isPrivate ? '🔒 Private' : '🌐 Public'}</div></div>
            <div class="subnet-item"><div class="subnet-label">Binary Mask</div><div class="subnet-value" style="font-size:0.75rem">${maskBinary.match(/.{8}/g).join('.')}</div></div>
            <div class="subnet-item"><div class="subnet-label">CIDR Notation</div><div class="subnet-value">/${cidr}</div></div>
        </div>
    `;
    showToast('Subnet calculated!');
});

function binaryToIP(binary) {
    return binary.match(/.{8}/g).map(b => parseInt(b, 2)).join('.');
}

function incrementIP(ip) {
    const parts = ip.split('.').map(Number);
    for (let i = 3; i >= 0; i--) {
        parts[i]++;
        if (parts[i] <= 255) break;
        parts[i] = 0;
    }
    return parts.join('.');
}

function decrementIP(ip) {
    const parts = ip.split('.').map(Number);
    for (let i = 3; i >= 0; i--) {
        parts[i]--;
        if (parts[i] >= 0) break;
        parts[i] = 255;
    }
    return parts.join('.');
}

// ===== CRON EXPRESSION BUILDER =====
const cronInputs = ['cronMinute', 'cronHour', 'cronDom', 'cronMonth', 'cronDow'];

cronInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateCron);
});

document.querySelectorAll('.preset-btn[data-cron]').forEach(btn => {
    btn.addEventListener('click', () => {
        const parts = btn.getAttribute('data-cron').split(' ');
        cronInputs.forEach((id, i) => {
            document.getElementById(id).value = parts[i] || '*';
        });
        updateCron();
    });
});

function updateCron() {
    const parts = cronInputs.map(id => document.getElementById(id).value || '*');
    const expression = parts.join(' ');
    document.getElementById('cronExpression').textContent = expression;
    document.getElementById('copyCron').setAttribute('data-clipboard', expression);

    // Description
    const desc = describeCron(parts);
    document.getElementById('cronDescription').innerHTML = `<i class="fas fa-info-circle"></i> <span>${desc}</span>`;
}

function describeCron(parts) {
    const [min, hour, dom, month, dow] = parts;

    if (parts.every(p => p === '*')) return 'Runs every minute';
    if (min === '0' && hour === '0' && dom === '*' && month === '*' && dow === '*') return 'Runs daily at midnight (00:00)';
    if (min === '0' && hour === '*' && dom === '*' && month === '*' && dow === '*') return 'Runs every hour at minute 0';
    if (min.startsWith('*/') && hour === '*') return `Runs every ${min.split('/')[1]} minutes`;
    if (min === '0' && hour === '0' && dom === '*' && month === '*' && dow === '0') return 'Runs weekly on Sunday at midnight';
    if (min === '0' && hour === '0' && dom === '1' && month === '*' && dow === '*') return 'Runs monthly on the 1st at midnight';
    if (min === '0' && hour === '0' && dom === '1' && month === '1' && dow === '*') return 'Runs yearly on January 1st at midnight';

    let desc = `Runs at minute ${min}`;
    if (hour !== '*') desc += `, hour ${hour}`;
    if (dom !== '*') desc += `, day ${dom} of month`;
    if (month !== '*') desc += `, month ${month}`;
    if (dow !== '*') desc += `, day-of-week ${dow}`;

    return desc;
}

// ===== JWT DECODER =====
document.getElementById('jwtSample').addEventListener('click', () => {
    document.getElementById('jwtInput').value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhpdGVzaCIsInJvbGUiOiJEZXZPcHMgRW5naW5lZXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk5OTk5OTk5OX0.abc123';
});

document.getElementById('decodeJwt').addEventListener('click', () => {
    const token = document.getElementById('jwtInput').value.trim();
    if (!token) { showToast('Paste a JWT token first', 'error'); return; }

    const parts = token.split('.');
    if (parts.length !== 3) {
        document.getElementById('jwtResults').innerHTML = `
            <div class="jwt-status" style="background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.3);color:#ff6b6b">
                <i class="fas fa-times-circle"></i> Invalid JWT format (expected 3 parts, got ${parts.length})
            </div>`;
        return;
    }

    try {
        const header = JSON.parse(atob(parts[0]));
        let payload;
        try {
            payload = JSON.parse(atob(parts[1]));
        } catch {
            // Handle base64url
            const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            payload = JSON.parse(atob(base64));
        }

        let statusHtml = '';
        if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            const isExpired = expDate < new Date();
            statusHtml = `
                <div class="jwt-status ${isExpired ? 'expired' : 'valid'}">
                    <i class="fas ${isExpired ? 'fa-times-circle' : 'fa-check-circle'}"></i>
                    ${isExpired ? 'Token EXPIRED' : 'Token Valid'} — Expires: ${expDate.toLocaleString()}
                </div>`;
        } else {
            statusHtml = `<div class="jwt-status warning"><i class="fas fa-exclamation-triangle"></i> No expiry (exp) claim found</div>`;
        }

        let payloadInfo = '';
        if (payload.iat) payloadInfo += `<div class="subnet-item"><div class="subnet-label">Issued At</div><div class="subnet-value">${new Date(payload.iat * 1000).toLocaleString()}</div></div>`;
        if (payload.sub) payloadInfo += `<div class="subnet-item"><div class="subnet-label">Subject</div><div class="subnet-value">${payload.sub}</div></div>`;
        if (payload.name) payloadInfo += `<div class="subnet-item"><div class="subnet-label">Name</div><div class="subnet-value">${payload.name}</div></div>`;

        document.getElementById('jwtResults').innerHTML = `
            ${statusHtml}
            <div class="jwt-section">
                <h4><i class="fas fa-heading"></i> Header</h4>
                <pre>${JSON.stringify(header, null, 2)}</pre>
            </div>
            <div class="jwt-section">
                <h4><i class="fas fa-database"></i> Payload</h4>
                <pre>${JSON.stringify(payload, null, 2)}</pre>
            </div>
            ${payloadInfo ? `<div class="jwt-section"><h4><i class="fas fa-info-circle"></i> Details</h4><div class="subnet-grid">${payloadInfo}</div></div>` : ''}
            <div class="jwt-section">
                <h4><i class="fas fa-signature"></i> Signature</h4>
                <pre>${parts[2]}</pre>
            </div>
        `;
        showToast('JWT decoded!');
    } catch (e) {
        document.getElementById('jwtResults').innerHTML = `
            <div class="jwt-status expired">
                <i class="fas fa-times-circle"></i> Error decoding: ${e.message}
            </div>`;
        showToast('Invalid JWT', 'error');
    }
});

// ===== REGEX TESTER =====
const regexPattern = document.getElementById('regexPattern');
const regexFlags = document.getElementById('regexFlags');
const regexTestString = document.getElementById('regexTestString');

[regexPattern, regexFlags, regexTestString].forEach(el => {
    el.addEventListener('input', testRegex);
});

document.querySelectorAll('.preset-btn[data-regex]').forEach(btn => {
    btn.addEventListener('click', () => {
        regexPattern.value = btn.getAttribute('data-regex');
        regexFlags.value = btn.getAttribute('data-flags');
        testRegex();
    });
});

function testRegex() {
    const pattern = regexPattern.value;
    const flags = regexFlags.value;
    const testStr = regexTestString.value;
    const resultsDiv = document.getElementById('regexResults');

    if (!pattern || !testStr) {
        resultsDiv.innerHTML = '<div class="result-placeholder"><i class="fas fa-search"></i><p>Enter pattern and test string</p></div>';
        return;
    }

    try {
        const regex = new RegExp(pattern, flags);
        const matches = [...testStr.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];

        if (matches.length === 0) {
            resultsDiv.innerHTML = `
                <div style="color:var(--warning);margin-bottom:12px"><i class="fas fa-exclamation-triangle"></i> No matches found</div>
                <div style="font-family:var(--font-mono);font-size:0.9rem;color:var(--text-secondary)">${escapeHtml(testStr)}</div>
            `;
            return;
        }

        // Highlight matches
        let highlighted = escapeHtml(testStr);
        const sortedMatches = matches.sort((a, b) => b.index - a.index);
        sortedMatches.forEach(match => {
            const start = match.index;
            const end = start + match[0].length;
            // Simple approach: use markers
        });

        // Alternative: rebuild with highlights
        let result = '';
        let lastIndex = 0;
        const allMatches = [...testStr.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];

        allMatches.forEach(match => {
            result += escapeHtml(testStr.substring(lastIndex, match.index));
            result += `<span class="regex-match">${escapeHtml(match[0])}</span>`;
            lastIndex = match.index + match[0].length;
        });
        result += escapeHtml(testStr.substring(lastIndex));

        resultsDiv.innerHTML = `
            <div style="color:var(--success);margin-bottom:12px"><i class="fas fa-check-circle"></i> ${allMatches.length} match(es) found</div>
            <div style="font-family:var(--font-mono);font-size:0.9rem;line-height:1.8;white-space:pre-wrap">${result}</div>
            <div class="regex-info">
                <strong>Matches:</strong>
                ${allMatches.map((m, i) => `<code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;margin:2px;display:inline-block">${i + 1}. "${m[0]}" at index ${m.index}</code>`).join(' ')}
            </div>
        `;
    } catch (e) {
        resultsDiv.innerHTML = `<div style="color:var(--error)"><i class="fas fa-times-circle"></i> Invalid regex: ${e.message}</div>`;
    }
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===== DOWNLOAD FILE UTILITY =====
function downloadFile(filename, content) {
    if (!content) {
        showToast('Nothing to download', 'error');
        return;
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`${filename} downloaded!`);
}

// ===== INITIAL CALLS =====
updateLineNumbers();
testRegex();
updateCron();