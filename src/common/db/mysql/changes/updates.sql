CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name TEXT NOT NULL
);

CREATE TABLE combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination_items TEXT NOT NULL,
    length INT NOT NULL,
    item_id INT NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination_id INT NOT NULL,
    FOREIGN KEY (combination_id) REFERENCES combinations(id) ON DELETE CASCADE
);
