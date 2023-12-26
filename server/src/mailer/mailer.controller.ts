import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateMailerDto } from './dto/mailer.dto';
import { transporter } from 'src/config/mail.config';

@Controller('mailer')
export class MailerController {
  @Post('mail-to')
  @HttpCode(HttpStatus.OK)
  async getPurchaseOrder(@Body() createMailerDto: CreateMailerDto) {
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻"noreply@neweast.co', // sender address
      to: createMailerDto.email,
      subject: 'Payment Request Voucher', // Subject line
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            color: #000000;
        }

        .btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

        footer {
            margin-top: 20px;
            text-align: center;
            color: #000000;
        }
    </style>
</head>
<body>
    <div class="container">
        <p style="font-size: 16px; font-weight: bold;">Hello ${createMailerDto.name},</p>
        <p>You have just received a payment voucher request from <b>${createMailerDto.createdBy}</b> with a total sum of <b>${createMailerDto.totalAmount}</b>.</p>
       <p class="btn">
            <a href=${createMailerDto.navigateTo} target="_blank" style="display: block; margin-top: 20px;  margin-bottom: 20px; width: 100px; padding: 10px 20px; font-size: 15px; font-weight: normal; text-align: center; text-decoration: none; color: #ffffff; background-color: #007bff; border: none; border-radius: 5px; cursor: pointer;">
              View Voucher
            </a>
          </p>
        <p>Click the above button to view the invoice and approve or reject the transaction.</p>
        <p>Shukran,<br>The new east team</p>
        <p></p>
    </div>
</body>
</html>
`, // html body
    });
    return info;
  }
}
