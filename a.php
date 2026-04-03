<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>F7V5 FA Rosa Asbuild</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #ff4d4f;
            --secondary-color: #1890ff;
            --accent-color: #722ed1;
            --background-color: #f0f2f5;
            --card-bg-color: #ffffff;
            --text-color: #333333;
            --border-radius: 12px;
            --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Manrope', sans-serif;
            background: linear-gradient(135deg, var(--background-color) 0%, #e6f7ff 100%);
            color: var(--text-color);
            padding: 20px;
            line-height: 1.6;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
        }

        .warning-header {
            background-color: var(--card-bg-color);
            color: var(--primary-color);
            font-weight: 700;
            font-size: 1.5rem;
            margin-bottom: 30px;
            padding: 20px 30px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            border-left: 5px solid var(--primary-color);
            display: flex;
            align-items: center;
            width: 100%;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .warning-header:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255, 77, 79, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
            z-index: 0;
        }

        .warning-header:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .warning-icon {
            font-size: 2rem;
            margin-right: 15px;
            position: relative;
            z-index: 1;
        }

        .warning-text {
            position: relative;
            z-index: 1;
        }

        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            width: 100%;
            margin-bottom: 30px;
        }

        .squeegee-item {
            border: 1px solid rgba(255, 77, 79, 0.2);
            background-color: var(--card-bg-color);
            border-radius: var(--border-radius);
            padding: 25px;
            box-shadow: var(--box-shadow);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .squeegee-item:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(to bottom, var(--secondary-color), var(--accent-color));
        }

        .squeegee-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .squeegee-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .squeegee-item-title {
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--text-color);
        }

        .squeegee-item-badge {
            background-color: rgba(24, 144, 255, 0.1);
            color: var(--secondary-color);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .data-row {
            display: flex;
            margin-bottom: 10px;
        }

        .label {
            font-weight: 600;
            color: var(--secondary-color);
            min-width: 100px;
        }

        .value {
            font-weight: 500;
            color: var(--text-color);
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            color: rgba(0, 0, 0, 0.45);
            font-size: 0.9rem;
            width: 100%;
            padding: 20px;
            background-color: var(--card-bg-color);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }

        @media (max-width: 768px) {
            .warning-header {
                font-size: 1.2rem;
                padding: 15px 20px;
            }

            .warning-icon {
                font-size: 1.5rem;
            }

            .card-container {
                grid-template-columns: 1fr;
            }

            .data-row {
                flex-direction: column;
            }

            .label {
                min-width: auto;
                margin-bottom: 5px;
            }

            .value {
                margin-left: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="warning-header">
            <span class="warning-icon">⚠️</span>
            <span class="warning-text">Dear All: This is F7V5 FA Rosa Asbuild daily product data</span>
        </div>

        <div class="footer">
            <p>© 2023 F7V5 FA Rosa Asbuild | Last Updated: <?php echo date('F d, Y H:i:s'); ?></p>
        </div>
    </div>
</body>
</html>