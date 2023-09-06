-- CreateTable
CREATE TABLE `properties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(300) NOT NULL,
    `street` VARCHAR(160) NOT NULL,
    `number` INTEGER NOT NULL,
    `complement` VARCHAR(160) NOT NULL,
    `neighborhood` VARCHAR(160) NOT NULL,
    `city` VARCHAR(160) NOT NULL,
    `state` VARCHAR(160) NOT NULL,
    `country` VARCHAR(160) NOT NULL,
    `zip_code` VARCHAR(160) NOT NULL,
    `house` BOOLEAN NOT NULL,
    `apartment` BOOLEAN NOT NULL,
    `rooms` INTEGER NOT NULL,
    `pet_friendly` BOOLEAN NOT NULL,
    `bed_linen` BOOLEAN NOT NULL,
    `towels` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
