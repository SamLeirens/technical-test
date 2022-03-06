drop table if exists EVENT;
CREATE TABLE EVENT
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    title         VARCHAR(255)          NULL,
    type          VARCHAR(255)          NULL,
    description VARCHAR(255)          NULL,
    start_date    date                  NULL,
    end_date      date                  NULL,
    CONSTRAINT pk_event PRIMARY KEY (id)
    );