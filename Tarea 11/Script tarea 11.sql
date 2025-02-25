-- Creación de la base de datos:
CREATE DATABASE agroapp;
USE agroapp;

-- Creación de tablas:
-- Tabla usuario
CREATE TABLE usuario (
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(20) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(10) NOT NULL
) ENGINE=InnoDB;

-- Tabla producto
CREATE TABLE producto (
    id_producto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    medida ENUM('libra', 'litro', 'Kilo', 'unidad') NOT NULL,
    categoria ENUM('Lácteos', 'Hortalizas', 'Frutas', 'Conservas', 'Carnes', 'Granos') NOT NULL,
    imagen VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Tabla pedido
CREATE TABLE pedido (
    id_pedido INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_pedido DATETIME NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('Pendiente', 'Entregado') NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
) ENGINE=InnoDB;

-- Tabla detalle_pedido
CREATE TABLE detalle_pedido (
    id_detalle_pedido INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
) ENGINE=InnoDB;

-- Tabla pago
CREATE TABLE pago (
    id_pago INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    estado ENUM('Aprobado', 'Rechazado') NOT NULL,
    metodo_pago ENUM('Tarjeta', 'Transferencia', 'Efectivo') NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
) ENGINE=InnoDB;

-- Insertar datos en la tabla usuario
INSERT INTO usuario (correo, contrasena, nombre, apellido, telefono) VALUES
('juan.perez@gmail.com', 'clave1234', 'Juan', 'Pérez', '3101234567'),
('maria.lopez@gmail.com', 'segura2024', 'María', 'López', '3209876543'),
('carlos.gomez@gmail.com', 'qwerty789', 'Carlos', 'Gómez', '3112233445'),
('ana.fernandez@gmail.com', 'pass5678', 'Ana', 'Fernández', '3123344556'),
('pedro.martinez@gmail.com', 'martinez123', 'Pedro', 'Martínez', '3134455667'),
('laura.garcia@gmail.com', 'laura2023', 'Laura', 'García', '3145566778'),
('diego.rodriguez@gmail.com', 'diegoabcd', 'Diego', 'Rodríguez', '3156677889'),
('sofia.morales@gmail.com', 'sofiapass', 'Sofía', 'Morales', '3167788990'),
('felipe.torres@gmail.com', 'felipepass', 'Felipe', 'Torres', '3178899001'),
('valentina.sanchez@gmail.com', 'valentina99', 'Valentina', 'Sánchez', '3189900112');

-- Insertar datos en la tabla producto
INSERT INTO producto (descripcion, nombre, precio, medida, categoria, imagen) VALUES
('Leche de vaca fresca y pasteurizada', 'Leche de vaca', 2500.00, 'litro', 'Lácteos', '/imagenes/products/leche_vaca.jpg'),
('Yogur natural sin azúcar añadido', 'Yogur natural', 5000.00, 'litro', 'Lácteos', '/imagenes/products/yogur_natural.jpg'),
('Queso fresco artesanal', 'Queso fresco', 10000.00, 'libra', 'Lácteos', '/imagenes/products/queso_fresco.jpg'),
('Papa criolla amarilla', 'Papa criolla', 5000.00, 'Kilo', 'Hortalizas', '/imagenes/products/papa_criolla.jpg'),
('Curuba fresca para jugos', 'Curuba', 8000.00, 'Kilo', 'Frutas', '/imagenes/products/curuba.jpg'),
('Mermelada de mora artesanal', 'Mermelada de mora', 9000.00, 'unidad', 'Conservas', '/imagenes/products/mermelada_mora.jpg'),
('Chorizo ahumado tradicional', 'Chorizo', 17000.00, 'Kilo', 'Carnes', '/imagenes/products/chorizo.jpg'),
('Frijoles rojos orgánicos', 'Fríjol', 9000.00, 'Kilo', 'Granos', '/imagenes/products/frijol.jpg'),
('Pollo campesino sin hormonas', 'Pollo campesino', 18500.00, 'Kilo', 'Carnes', '/imagenes/products/pollo_campesino.jpg'),
('Chocolate artesanal de cacao puro', 'Chocolate artesanal', 18000.00, 'unidad', 'Conservas', '/imagenes/products/chocolate_artesanal.jpg');

-- Insertar datos en la tabla pedido
INSERT INTO pedido (id_usuario, fecha_pedido, total, estado) VALUES
(1, '2024-02-01 10:30:00', 25000.00, 'Pendiente'),
(2, '2024-02-02 14:45:00', 18000.00, 'Entregado'),
(3, '2024-02-03 09:15:00', 9000.00, 'Pendiente'),
(4, '2024-02-04 16:20:00', 5000.00, 'Entregado'),
(5, '2024-02-05 18:00:00', 7500.00, 'Pendiente'),
(6, '2024-02-06 12:10:00', 17000.00, 'Pendiente'),
(7, '2024-02-07 08:50:00', 30000.00, 'Entregado'),
(8, '2024-02-08 20:15:00', 9000.00, 'Pendiente'),
(9, '2024-02-09 11:40:00', 14000.00, 'Entregado'),
(10, '2024-02-10 15:30:00', 18500.00, 'Pendiente');

-- Insertar datos en la tabla detalle_pedido
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, subtotal) VALUES
(1, 1, 2, 5000.00),
(1, 3, 1, 10000.00),
(2, 2, 1, 5000.00),
(2, 4, 1, 5000.00),
(3, 5, 2, 16000.00),
(4, 6, 1, 9000.00),
(5, 7, 1, 17000.00),
(6, 8, 2, 18000.00),
(7, 9, 1, 18500.00),
(8, 10, 1, 18000.00);

-- Insertar datos en la tabla pago
INSERT INTO pago (id_pedido, monto, estado, metodo_pago) VALUES
(1, 25000.00, 'Aprobado', 'Tarjeta'),
(2, 18000.00, 'Aprobado', 'Transferencia'),
(3, 9000.00, 'Rechazado', 'Efectivo'),
(4, 5000.00, 'Aprobado', 'Tarjeta'),
(5, 7500.00, 'Aprobado', 'Efectivo'),
(6, 17000.00, 'Aprobado', 'Tarjeta'),
(7, 30000.00, 'Aprobado', 'Transferencia'),
(8, 9000.00, 'Rechazado', 'Efectivo'),
(9, 14000.00, 'Aprobado', 'Tarjeta'),
(10, 18500.00, 'Rechazado', 'Efectivo');