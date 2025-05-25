# Gestion des Consommables

Application web de gestion des consommables réalisée dans le cadre de mon projet de fin de formation en développement digital (option Web Full Stack).

## 🎯 Objectif du projet

Permettre à un établissement de formation de :
- Gérer les consommables (ajout, suppression, mise à jour)
- Suivre les commandes et livraisons
- Générer des statistiques
- Avoir des rôles utilisateurs distincts (personnel, directeur)

## 🛠️ Technologies utilisées

- **Frontend** : React.js + Material UI
- **Backend** : Laravel 10
- **Base de données** : MySQL
- **Stockage d’images** : Laravel Storage (`storage/app/public/img`)
- **API** : RESTful avec Axios

## 🔐 Rôles utilisateurs

- **Personnel** : consultation des consommables, création de commandes
- **Magasinier** : gestion du stock et des livraisons
- **Directeur** : validation des commandes/livraisons

## 🧪 Fonctionnalités principales

- Authentification
- CRUD complet sur les consommables
- Upload et affichage d’image
- Commande par consommable
- Livraison associée
- Statistiques sous forme de graphiques

## 🚀 Lancer le projet en local

### 📦 Backend (Laravel)

```bash
cd back/Gestion_consomable
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
