import { Image } from "antd";
import { useState } from "react";

interface PetImageGalleryProps {
  images: string[];
}

export default function PetImageGallery({ images }: PetImageGalleryProps) {
  const [visible, setVisible] = useState(false);

  const mainImage = images[0];
  const subImages = images.slice(1, 4);
  const remaining = images.length - 4;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* MAIN IMAGE */}
        <img
          src={mainImage}
          style={{
            width: "100%",
            height: 350,
            objectFit: "cover",
            borderRadius: 8,
            cursor: "pointer",
          }}
          onClick={() => setVisible(true)}
        />

        {/* SMALL IMAGES */}
        <div style={{ display: "flex", gap: 8 }}>
          {subImages.map((img, index) => {
            const isLast = index === 2 && remaining > 0;

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "33%",
                  height: 90,
                  cursor: "pointer",
                }}
                onClick={() => setVisible(true)}
              >
                <img
                  src={img}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 6,
                    filter: isLast ? "brightness(0.6)" : undefined,
                  }}
                />

                {isLast && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    +{remaining}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* HIDDEN PREVIEW GROUP */}
      <Image.PreviewGroup
        preview={{
          visible,
          onVisibleChange: (vis) => setVisible(vis),
        }}
      >
        {images.map((img, i) => (
          <Image key={i} src={img} style={{ display: "none" }} />
        ))}
      </Image.PreviewGroup>
    </>
  );
}
