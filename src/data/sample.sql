-- Thêm dữ liệu mẫu cho danh mục
INSERT INTO categories (name, slug, description) VALUES
('Giày Nam', 'giay-nam', 'Các loại giày dành cho nam'),
('Giày Nữ', 'giay-nu', 'Các loại giày dành cho nữ'),
('Giày Thể Thao', 'giay-the-thao', 'Các loại giày thể thao'),
('Giày Sandal', 'giay-sandal', 'Các loại giày sandal'),
('Giày Cao Gót', 'giay-cao-got', 'Các loại giày cao gót'),
('Giày Trẻ Em', 'giay-tre-em', 'Các loại giày dành cho trẻ em');

-- Thêm dữ liệu mẫu cho kích cỡ
INSERT INTO sizes (name) VALUES
('35'),
('36'),
('37'),
('38'),
('39'),
('40'),
('41'),
('42'),
('43'),
('44');

-- Thêm dữ liệu mẫu cho màu sắc
INSERT INTO colors (name, color_code) VALUES
('Đen', '#000000'),
('Trắng', '#FFFFFF'),
('Đỏ', '#FF0000'),
('Xanh Dương', '#0000FF'),
('Xanh Lá', '#00FF00'),
('Vàng', '#FFFF00'),
('Nâu', '#964B00'),
('Xám', '#808080'),
('Hồng', '#FFC0CB'),
('Cam', '#FFA500');

-- Thêm dữ liệu mẫu cho sản phẩm
INSERT INTO products (name, slug, description, price, sale_price, stock_quantity, category_id, is_featured, is_active) VALUES
('Giày Thể Thao Nam Nike Air Force 1', 'giay-the-thao-nam-nike-air-force-1', 'Giày thể thao nam Nike Air Force 1 với thiết kế hiện đại, trẻ trung, mang lại cảm giác thoải mái khi sử dụng.', 2500000, 2200000, 50, 1, true, true),
('Giày Cao Gót Nữ Elegance', 'giay-cao-got-nu-elegance', 'Giày cao gót nữ Elegance với thiết kế sang trọng, quý phái, phù hợp cho các buổi tiệc.', 1800000, 1600000, 30, 5, true, true),
('Giày Thể Thao Adidas Ultraboost', 'giay-the-thao-adidas-ultraboost', 'Giày thể thao Adidas Ultraboost với công nghệ đệm Boost mang lại cảm giác êm ái khi chạy bộ.', 3200000, 2800000, 40, 3, true, true),
('Giày Sandal Nữ Havaianas', 'giay-sandal-nu-havaianas', 'Giày sandal nữ Havaianas với thiết kế đơn giản, thoải mái, phù hợp cho mùa hè.', 850000, 750000, 60, 4, false, true),
('Giày Thể Thao Trẻ Em Bitis', 'giay-the-thao-tre-em-bitis', 'Giày thể thao trẻ em Bitis với thiết kế năng động, nhiều màu sắc, phù hợp cho các bé.', 550000, 500000, 70, 6, false, true),
('Giày Tây Nam Công Sở', 'giay-tay-nam-cong-so', 'Giày tây nam công sở với thiết kế lịch lãm, sang trọng, phù hợp cho môi trường làm việc.', 1500000, 1350000, 45, 1, true, true),
('Giày Búp Bê Nữ', 'giay-bup-be-nu', 'Giày búp bê nữ với thiết kế đơn giản, dễ phối đồ, phù hợp cho đi làm, đi chơi.', 650000, 600000, 55, 2, false, true),
('Giày Thể Thao Puma RS-X', 'giay-the-thao-puma-rs-x', 'Giày thể thao Puma RS-X với thiết kế độc đáo, cá tính, mang lại phong cách trẻ trung.', 2800000, 2500000, 35, 3, true, true),
('Giày Sandal Nam Outdoor', 'giay-sandal-nam-outdoor', 'Giày sandal nam outdoor với thiết kế chắc chắn, bền bỉ, phù hợp cho các hoạt động ngoài trời.', 950000, 850000, 40, 4, false, true);

-- Thêm dữ liệu mẫu cho hình ảnh sản phẩm
INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(1, '/placeholder.svg?height=500&width=500', true),
(1, '/placeholder.svg?height=500&width=500', false),
(2, '/placeholder.svg?height=500&width=500', true),
(2, '/placeholder.svg?height=500&width=500', false),
(3, '/placeholder.svg?height=500&width=500', true),
(3, '/placeholder.svg?height=500&width=500', false),
(4, '/placeholder.svg?height=500&width=500', true),
(4, '/placeholder.svg?height=500&width=500', false),
(5, '/placeholder.svg?height=500&width=500', true),
(5, '/placeholder.svg?height=500&width=500', false),
(6, '/placeholder.svg?height=500&width=500', true),
(6, '/placeholder.svg?height=500&width=500', false),
(7, '/placeholder.svg?height=500&width=500', true),
(7, '/placeholder.svg?height=500&width=500', false),
(8, '/placeholder.svg?height=500&width=500', true),
(8, '/placeholder.svg?height=500&width=500', false),
(9, '/placeholder.svg?height=500&width=500', true),
(9, '/placeholder.svg?height=500&width=500', false),
(10, '/placeholder.svg?height=500&width=500', true),
(10, '/placeholder.svg?height=500&width=500', false);

-- Thêm dữ liệu mẫu cho biến thể sản phẩm
INSERT INTO product_variants (product_id, size_id, color_id, sku, price, stock_quantity) VALUES
(1, 6, 1, 'NAF1-40-BLACK', 2200000, 10),
(1, 6, 2, 'NAF1-40-WHITE', 2200000, 10),
(1, 7, 1, 'NAF1-41-BLACK', 2200000, 10),
(1, 7, 2, 'NAF1-41-WHITE', 2200000, 10),
(2, 3, 1, 'ELG-37-BLACK', 1600000, 5),
(2, 3, 9, 'ELG-37-PINK', 1600000, 5),
(2, 4, 1, 'ELG-38-BLACK', 1600000, 5),
(2, 4, 9, 'ELG-38-PINK', 1600000, 5),
(3, 6, 4, 'AUB-40-BLUE', 2800000, 8),
(3, 6, 2, 'AUB-40-WHITE', 2800000, 8),
(3, 7, 4, 'AUB-41-BLUE', 2800000, 8),
(3, 7, 2, 'AUB-41-WHITE', 2800000, 8),
(4, 3, 2, 'HAV-37-WHITE', 750000, 12),
(4, 3, 9, 'HAV-37-PINK', 750000, 12),
(4, 4, 2, 'HAV-38-WHITE', 750000, 12),
(4, 4, 9, 'HAV-38-PINK', 750000, 12),
(5, 1, 3, 'BIT-35-RED', 500000, 15),
(5, 1, 4, 'BIT-35-BLUE', 500000, 15),
(5, 2, 3, 'BIT-36-RED', 500000, 15),
(5, 2, 4, 'BIT-36-BLUE', 500000, 15),
(6, 6, 1, 'TAY-40-BLACK', 1350000, 9),
(6, 6, 7, 'TAY-40-BROWN', 1350000, 9),
(6, 7, 1, 'TAY-41-BLACK', 1350000, 9),
(6, 7, 7, 'TAY-41-BROWN', 1350000, 9),
(7, 2, 1, 'BUP-36-BLACK', 600000, 11),
(7, 2, 9, 'BUP-36-PINK', 600000, 11),
(7, 3, 1, 'BUP-37-BLACK', 600000, 11),
(7, 3, 9, 'BUP-37-PINK', 600000, 11),
(8, 6, 1, 'PRS-40-BLACK', 2500000, 7),
(8, 6, 3, 'PRS-40-RED', 2500000, 7),
(8, 7, 1, 'PRS-41-BLACK', 2500000, 7),
(8, 7, 3, 'PRS-41-RED', 2500000, 7),
(9, 6, 7, 'OUT-40-BROWN', 850000, 8),
(9, 6, 8, 'OUT-40-GRAY', 850000, 8),
(9, 7, 7, 'OUT-41-BROWN', 850000, 8),
(9, 7, 8, 'OUT-41-GRAY', 850000, 8);
