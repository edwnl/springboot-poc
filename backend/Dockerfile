FROM gradle:8.13-jdk17
WORKDIR /app
# Copy Gradle files to cache dependencies
COPY build.gradle settings.gradle ./
RUN gradle dependencies --no-daemon
# Copy source code
COPY src ./src
# Run in continuous mode with bootRun
CMD ["sh", "-c", "gradle -t classes & gradle bootRun --no-daemon"]
