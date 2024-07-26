# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Build image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Wordsthetic.WEB/Wordsthetic.WEB.csproj", "Wordsthetic.WEB/"]
RUN dotnet restore "Wordsthetic.WEB/Wordsthetic.WEB.csproj"
COPY . .
WORKDIR "/src/Wordsthetic.WEB"
RUN dotnet build "Wordsthetic.WEB.csproj" -c Release -o /app/build

FROM build AS publish
WORKDIR /src/Wordsthetic.WEB
RUN dotnet publish "Wordsthetic.WEB.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Wordsthetic.WEB.dll"]
