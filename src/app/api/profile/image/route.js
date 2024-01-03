import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function PUT(req) {
  try {
    const { user } = await getServerSession(authOptions);

    const data = await req.formData();
    if (!data.has("image"))
      return new Response("image missing", { status: 403 });
    const image = data.get("image");
    //upload the file to s3 bucket
    const s3 = new S3Client({
      region: "eu-west-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // console.log("image name: ", image.name);

    //get file extension
    const fileExtension = image.name.split(".").pop();

    //get file name without extension
    const fileNameWithoutExtension = image.name.split(".").shift();

    //add uuid to the file name
    const fileName = `${fileNameWithoutExtension}-${uuidv4()}.${fileExtension}`;

    const chunks = [];

    for await (const chunk of image.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    await s3.send(
      new PutObjectCommand({
        Bucket: "954036011159-pizza-app-bucket",
        Key: fileName,
        Body: buffer,
        ContentType: image.type,
        ACL: "public-read",
      })
    );

    const linkToImage = `https://954036011159-pizza-app-bucket.s3.eu-west-1.amazonaws.com/${fileName}`;

    return Response.json({ linkToImage: linkToImage });
  } catch (error) {
    console.error(error);
    return new Response("mongo error", {
      status: 403,
    });
  }
} // Compare this snippet from src/app/api/profile/image/route.js:
